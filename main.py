# Required Libraries

import os
import shutil

# Detectron2 Imports
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2 import model_zoo

# OpenCV
import cv2

# Pandas,Numpy,Matplotlib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Supress tensor warnings
import warnings
warnings.filterwarnings("ignore")

#Others
import datetime as dt
from collections import defaultdict


# THRESHOLDS 

VALUE_THRES=250
SATURATION_THRES=5
EPSILON_THRES=4
BASE_SUM_THRES=250

# CONSTANTS
STACK_COLORS= {5:'base',4:'white',3:'blue',2:"green",1:'yellow',0:'red'}
STACK_DESC={0:'Machine Down.',1: 'Waiting on Material.',
            2: 'All good, running fine.',3: 'Optional 1.',
            4: 'Optional 2.',5 : 'No light detected.'}
COLORS_RGB={'red':(0,0,255),'yellow':(51,255,255),'green':(0,102,0),'blue':(255,0,0),'white':(255,255,255),'base':(204,0,205)}


MODEL_DIR='model/model_final.pth'


class RecordTimeStamp:

    def __init__(self) -> None:
        self.result=defaultdict(list)

    def update_time_stamp(self,label,desc,start_time,end_time,name='machine_1'):

        self.result['machine_name'].append(name)
        self.result['machine_state'].append(label)
        self.result['description'].append(desc)
        self.result['start_time'].append(start_time)
        self.result['end_time'].append(end_time)
    
    def update_previous_end_time_stamp(self,end_time):
        self.result['end_time'][-1]=end_time


    def compute_statistics(self,data:pd.DataFrame):

        # end_time = data['end_time'].apply(lambda x  : pd.to_datetime(x) if x!=0 else pd.to_datetime('1900-01-01 00:00:00'))
        # start_time = pd.to_datetime(data['start_time'])
        end_time=data['end_time']
        start_time=data['start_time']
        data['duration'] = (end_time - start_time)
        data['duration']=data['duration'].apply(lambda x : round(x,3) if x>0 else 0)
        data['timestamp(s)']=[i+1 for i in range(data.shape[0])]

        data=data[['timestamp(s)', 'machine_name', 'machine_state', 'description','start_time','end_time','duration']]

        # Statistics
        non_zero_durations = data[data['duration'] > 0]
        total_downtime = data[data['machine_state'] != 'green']['duration'].sum()
        total_duration=data['duration'].sum()

        min_duration_func = lambda col : non_zero_durations.loc[non_zero_durations['duration'].idxmin(),col]
        max_duration_func = lambda col : non_zero_durations.loc[non_zero_durations['duration'].idxmax(),col]

        return {'data': data,'statistics':{
                'total_duration': (end_time.iloc[-1]- start_time.iloc[0]),
                'max_duration_state': max_duration_func('machine_state'),'min_duration_state':min_duration_func('machine_state'),
                'max_duration_time':max_duration_func('duration'),'min_duration_time':min_duration_func('duration'),
                'downtime_duration':total_downtime,'downtime_percentage': round( (total_downtime /total_duration ) * 100,2)}}

    def get_result(self):
        return self.compute_statistics(pd.DataFrame(self.result))
    
    def save(self):
        pd.DataFrame(self.result).to_excel('result.xlsx')

    


class Inference(RecordTimeStamp):


    def __init__(self,stack_type:dict={},stack_description:dict={},model_path:str='',debug:bool=False) -> None:
        
        self.stack_type=stack_type
        self.image=None
        self.debug=debug
        self.stack_description=stack_description
        # TODO :Setup Logger
        
        # Detectron Inference configurations
        cfg = get_cfg()
        cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_X_101_32x8d_FPN_3x.yaml"))
        cfg.DATALOADER.NUM_WORKERS = 4
        cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Detection/faster_rcnn_X_101_32x8d_FPN_3x.yaml")  
        cfg.SOLVER.IMS_PER_BATCH = 2 
        cfg.MODEL.ROI_HEADS.BATCH_SIZE_PER_IMAGE = 128 
        cfg.MODEL.ROI_HEADS.NUM_CLASSES = 1  
        cfg.MODEL.WEIGHTS = model_path
        cfg.MODEL.DEVICE = "cpu"
        cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.8
        self.predictor = DefaultPredictor(cfg)

        try:
            file_path='predicted_frames'
            if os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

        super().__init__()


    def predict_bounding_box(self) -> np.ndarray:
        #TODO : stack this output to avoid prediction out cases
        outputs = self.predictor(self.image)
        return outputs["instances"].get_fields()["pred_boxes"].tensor.numpy()
    
    def refine_coordinates(self,coordinates:np.ndarray) -> np.ndarray:
        # TODO : reduce model hallucination

        if len(coordinates)>0:
            if coordinates.ndim>=2:
                coordinates=coordinates[0]
            x1,y1,x2,y2=np.ravel(coordinates).astype(int)
            width,height=x2-x1,y2-y1
            return True,np.array([x1,y1,width,height])
        else:
            return False , []
    

    def high_value_region_mask(self,hsv_image, v_thres) -> np.ndarray:
        if hsv_image.dtype == np.int64:
            idx = (hsv_image.astype(np.float64) / 255.0) < v_thres
        else:
            idx = (hsv_image.astype(np.float64)) < v_thres
        mask = np.ones_like(hsv_image)
        mask[idx] = 0
        return mask
    
    def high_saturation_region_mask(self,hsv_image, s_thres) -> np.ndarray:
        if hsv_image.dtype == np.int64:
            idx = (hsv_image.astype(np.float64) / 255.0) < s_thres
        else:
            idx = (hsv_image.astype(np.float64)) < s_thres
        mask = np.ones_like(hsv_image)
        mask[idx] = 0
        return mask
    
    def high_mask_region(self,mask) -> str:
        length,_=mask.shape
        chunks=len(self.stack_type)
        cur_x,curr_max,max_value,max_part=0,0,0,0
        epsilon=EPSILON_THRES
        for chunk in range(chunks):
            current_mask_value=np.sum(mask[cur_x:int(cur_x+(length/chunks))+epsilon])
            # print(chunk,current_mask_value)
            cur_x=int(cur_x+(length/chunks))+epsilon
            curr_max=current_mask_value
            if curr_max>BASE_SUM_THRES and curr_max>max_value:
                max_value=curr_max
                max_part=chunk
            if max_value==0:
                max_part=5

        return max_part
    
    def recreate_image_with_bbox_and_label(self,image,bbox,label,time):
        height,width,_=image.shape

        if height>1000 and width>2000:
            font_size,font_width=3,3
        elif height<1000 and width<2000:
            font_size,font_width=1.5,2

        x1,y1,w,h=bbox
        cv2.rectangle(image,(x1,y1),(x1+w,y1+h),COLORS_RGB[label],4)
        cv2.putText(image, f"{label}", (int(0.11*width), int(0.80*height)), cv2.FONT_HERSHEY_SIMPLEX, font_size, COLORS_RGB[label], font_width)
        cv2.putText(image, f"{time}", (int(0.12*height), int(0.12*width)), cv2.FONT_HERSHEY_SIMPLEX, font_size, ( 0, 0,255), font_width)

        return image


    def run_prediction_on_image(self,image_path,on_video:bool=False) -> str:
        
        if on_video:
            self.image=cv2.cvtColor(image_path,cv2.COLOR_RGB2BGR)
        else:
            self.image=cv2.cvtColor(cv2.imread(image_path), cv2.COLOR_RGB2BGR)
        
        predicted_bbox=self.predict_bounding_box()

        # Get image coordinates 
        status, coordinates_arr = self.refine_coordinates(predicted_bbox)

        if not status:
            
            return (False,None)
        else:

            x , y , width ,height = coordinates_arr

            self.cropped_image= self.image[y: y+height, x: x+width]
            # convert BGR to HSV
            self.cropped_image_hsv=cv2.cvtColor(self.cropped_image,cv2.COLOR_BGR2HSV)
            _,saturation,value = cv2.split(self.cropped_image_hsv)

            # create a mask at low saturation and high value
            # image_mask=np.logical_and(self.high_value_region_mask(value,VALUE_THRES),np.logical_not(self.high_saturation_region_mask(saturation,SATURATION_THRES)))
            image_mask=self.high_value_region_mask(value,VALUE_THRES)

            predicted_state=self.high_mask_region(image_mask)

            return (True,(self.stack_type[predicted_state],self.stack_description[predicted_state],[x,y,width,height]))

    def run_prediction_on_video(self,video_path:str='',save_images_path:str='predicted_frames',save_prediction:bool=False,save_video_path:str='video_output'):
        
        cap = cv2.VideoCapture(video_path)
        # Get the video properties
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        # breaks video into sec frame
        sec=1
        if save_prediction:
            os.makedirs(save_images_path,exist_ok=True)

        previous_label=""
        previous_time=None
        this_time=None

        while cap.isOpened():
            cap.set(cv2.CAP_PROP_POS_MSEC,(sec*1000)) 
            ret, frame = cap.read()
            if not ret:
                break
            
            success,predicted_data=self.run_prediction_on_image(frame,on_video=True)
            if not success:
                pass
            else:
                predicted_label,predicted_desc,predicted_bbox=predicted_data

                print(sec,predicted_label)
                # print(previous_time)
                if previous_label!=predicted_label:
                    this_time=sec
                    if sec==1:
                        self.update_time_stamp(predicted_label,predicted_desc,this_time,0)
                    else:
                        self.update_previous_end_time_stamp(this_time)
                        self.update_time_stamp(predicted_label,predicted_desc,this_time,0)

                    previous_label=predicted_label
                    previous_time=this_time
                else:
                    self.update_time_stamp(predicted_label,predicted_desc,previous_time,0)
                
            
                if save_prediction:
                    
                    frame=self.recreate_image_with_bbox_and_label(frame,label=predicted_label,bbox=predicted_bbox,time=previous_time)

                    cv2.imwrite(save_images_path+'/'+f'{sec}.png',frame)

            cv2.waitKey(20)
            sec+=1
        cap.release()
        cv2.destroyAllWindows()
        self.update_previous_end_time_stamp(sec)

        # save video 
        if save_prediction:
            image_folder = save_images_path
            # video_name = f'{save_video_path}.avi'
            video_name = f'{save_video_path}.mp4'

            images = [img for img in sorted(os.listdir(image_folder),key=lambda x: int(x.split(".")[0])) if img.endswith(".png")]
            frame = cv2.imread(os.path.join(image_folder, images[0]))
            height, width, _ = frame.shape

            video = cv2.VideoWriter(video_name, cv2.VideoWriter_fourcc(*'mp4v'), 1, (width,height))

            for image in images:
                video.write(cv2.imread(os.path.join(image_folder, image)))

            cv2.destroyAllWindows()
            video.release()
            print('Video generated')

        
def run_algorithm(video_path:str="",return_video:bool=False,save_video_path:str="output_vid"):
    temp_video_name='temp_video'
    obj=Inference(model_path=MODEL_DIR,stack_type=STACK_COLORS,stack_description=STACK_DESC,debug=0)
    obj.run_prediction_on_video(video_path=video_path,save_prediction=return_video,save_video_path=temp_video_name)
    os.system(f"ffmpeg -i {temp_video_name}.mp4 -vcodec libx264 -f mp4 {save_video_path}.mp4")

    return obj.get_result()


# if __name__ =='__main__':
    
#     model_dir='model/model_final.pth'

#     video_path='TEST_.mp4'
#     obj=Inference(model_path=model_dir,stack_type=STACK_COLORS,stack_description=STACK_DESC,debug=0)
#     obj.run_prediction_on_video(video_path=video_path,save_prediction=True)
#     os.system("ffmpeg -i video_output.mp4 -vcodec libx264 -f mp4 output.mp4")

#     obj.save()
#     print(obj.get_result())
