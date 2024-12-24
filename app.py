import os
import json
import numpy as np
from flask import Flask, request, jsonify,send_from_directory
from main import run_algorithm
import random
from flask_cors import CORS
import traceback

OUTPUT_STORE_DIR='output_vid'


app = Flask(__name__,static_folder=OUTPUT_STORE_DIR,static_url_path='/'+OUTPUT_STORE_DIR)
app.json.sort_keys = False

cors = CORS(app)

def random_name_generator():
    return ''.join(chr(random.randint(65,90)) for _ in range(4))
    
class Jsonencoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(Jsonencoder, self).default(obj)



# @cross_origin()
@app.route('/upload', methods=["POST"])
def upload():
    data = request.json
    os.makedirs(OUTPUT_STORE_DIR,exist_ok=True)
    name = random_name_generator()
    video_name = f'{OUTPUT_STORE_DIR}/{name}'
    try:
        output = run_algorithm(data["video"], return_video=True, save_video_path=video_name)
        df_dict = output['data'].to_dict('records')
        
        df_stats=output['statistics']
        return json.loads(json.dumps({"data":df_dict, "statistics":df_stats,"video_name":name},cls=Jsonencoder))

    except Exception as e:
        print(traceback.format_exc())
        return jsonify(error=str(e))
    

@app.route(f'/{OUTPUT_STORE_DIR}/<path:filename>')
def send_video(filename:str):
    return send_from_directory(app._static_folder,filename)


if __name__ == "__main__":
    app.run(debug=True)
