import React from "react";
import { useNavigate } from "react-router-dom";
// import {logo} from "../images/Symbol.jpg"

function Header() {
  const navigate = useNavigate();

  return (
    <div className=" header align-items-center gap-2 mt-1 ">
      <img
        alt="logo image"
        className="logo"
        src="https://creative-story.s3.amazonaws.com/test/1717572404922-Symbol.jpg"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer",marginLeft:"6rem" }}
      />

      <div
        style={{
          color: "black",
          fontWeight: "700",
          fontSize: "28px",
          lineHeight: "33.6px",
        }}
        className="m-3 d-flex gap-5"
      >
        
      </div>
      <div className="mx-4">
        {/* <h3 className="m-0 logo-text">Artificial intelligence</h3> */}
      </div>
    </div>
  );
}

export default Header;
