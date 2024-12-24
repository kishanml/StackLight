import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Form,
  Row,
  Spinner,
  Button,
  Container,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FeatureSection from "./components/FeatureSection";
import Aos from "aos";
import "aos/dist/aos.css";
import { TbUpload } from "react-icons/tb";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  const navigate = useNavigate();
  const [csvData, setCsvData] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", e.target.files[0]);

    setLoading(true);
    try {
      // const { data } = await axios.post(
      //   "https://scienda-backend.adaptable.app/upload-video",
      //   formData
      // );
      console.log(formData);
      const response = await axios.post("http://localhost:5000/upload", {
        video: "test_x.mp4",
      });

      console.log("response jnjdbdhb", response);
      localStorage.setItem("setCsvData", JSON.stringify(response.data.data));

      const response1 = await fetch(
        `http://localhost:5000/output_vid/${response.data.video_name}.mp4`
      );
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("dsdfsd");
      const blob = await response1.blob();
      const url = window.URL.createObjectURL(blob);
      localStorage.setItem("setVideoPath", response.data.video_name);
      localStorage.setItem(
        "analytics",
        JSON.stringify(response.data.statistics)
      );
      setLoading(false);
      navigate("/component");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const renderTableHeaders = () => {
    const headers = Object.keys(csvData[0]);
    return headers.map((header, index) => (
      <th
        style={{ border: "1px solid black", textAlign: "center" }}
        key={index}
      >
        {header.toUpperCase()}
      </th>
    ));
  };

  const renderTableRows = () => {
    return csvData.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        style={{ border: "1px solid black", textAlign: "center" }}
      >
        {Object.values(row).map((value, columnIndex) => (
          <td key={columnIndex}>{value}</td>
        ))}
      </tr>
    ));
  };
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPath, setVideoPath] = useState("");

  const [video, setVideo] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setVideo(e.target.files[0]);

    reader.onload = () => {
      setVideoUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <Header />

      {/* <div className="my-5">
        {!videoUrl && (
          <h2
            className="logo-text text-center m-0 display-1"
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-delay="400"
          >
            Machine Productivity Tracking Using AI
          </h2>
        )}
      </div>
      <div className="d-flex flex-column body">
        <div className="main-content">
          <Row
            style={{ marginBottom: "40px" }}
            className={`align-items-center`}
          >
            <Col sm={12} className="text-center">
              <Button
                className="selector border-0 px-5"
                size="lg"
                onClick={handleButtonClick}
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="600"
              >
                Select Video
              </Button>
              <input
                id="video-upload"
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                accept="video/*"
                style={{ display: "none" }}
              />
            </Col>
          </Row>
          {!videoUrl && (
            <Container className="px-md-5 ">
              <p
                className=" text-center text-white m-0 "
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="800"
              >
                Real-time data helps identify inefficiencies, predict
                maintenance, and improve performance, leading to reduced costs,
                increased throughput, and enhanced efficiency for clients in
                manufacturing. Utilizing AI technologies, our platform tracks
                machine productivity, analyzes patterns, and provides actionable
                insights for optimizing operations.
              </p>
            </Container>
          )}

          {videoUrl && (
            <div className="preview">
              <div className="align-items-center justify-content-center mb-1">
                {videoUrl && (
                  <video
                    style={{
                      height: "400px",
                      width: "90%",
                      alignItems: "center",
                    }}
                    src={videoUrl}
                    controls
                  />
                )}
              </div>
              <div className="align-items-center">
                <Button
                  onClick={submitHandler}
                  className="pt-2 pb-2 uploader border-0"
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Upload Video"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
        {!videoUrl && <FeatureSection />}
        <Footer />
      </div> */}

      <div className="main d-flex justify-content-center gap-1 align-items-center">
        <div
          style={{ height: "300px", marginTop: "2rem" }}
          className="d-flex flex-column justify-content-between align-items-between"
        >
         

        </div>

        <div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontWeight: "600",
                fontSize: "60px",
                lineHeight: "64px",
              }}
            >
              Machine
            </div>{" "}
            <div
              style={{
                fontWeight: "600",
                fontSize: "60px",
                lineHeight: "64px",
              }}
            >
              Productivity Tracking
            </div>
          </div>
          <div>
            <p
              className="ai-text"
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: "92px",
                lineHeight: "92px",
              }}
            >
              Application
            </p>
          </div>
          <div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "22px",
                lineHeight: "27px",
                textAlign: "center",
                color: "rgba(51, 51, 51, 0.7)",
              }}
            >
              Real-time data identifies inefficiencies, predicts
            </div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "22px",
                lineHeight: "27px",
                textAlign: "center",
                color: "rgba(51, 51, 51, 0.7)",
              }}
            >
              maintenance, and boosts performance.
            </div>
          </div>
        </div>

        <div
          style={{ height: "300px", marginTop: "2rem" }}
          className="d-flex flex-column justify-content-between align-items-between"
        >
         
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Button
          className="bg-primary"
          size="lg"
          onClick={handleButtonClick}
          // data-aos="fade-up"
          // data-aos-duration="500"
          // data-aos-delay="600"
        >
          {!loading ? (
            <>
              <TbUpload /> Upload Video
            </>
          ) : (
            <Spinner size="sm" />
          )}
        </Button>
        <input
          id="video-upload"
          ref={fileInputRef}
          onChange={submitHandler}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
        />
      </div>

      {/* <div className="d-flex justify-content-center gap-1 align-items-center">
        <div>
          <img src="https://creative-story.s3.amazonaws.com/test/1717572404922-Symbol.jpg" />
        </div>

        <div>
          <img src="https://creative-story.s3.amazonaws.com/test/1717572404922-Symbol.jpg" />
        </div>
      </div> */}
    </div>
  );
}

export default App;
