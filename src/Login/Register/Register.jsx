import React from "react";
import "./Register.scss";

import phUserIcon from "./assets/ph_user.svg";
import carbonPasswordIcon from "./assets/carbon_password.svg";
import rectangleImage from "./assets/Rectangle.png";

const Register = () => {
  return (
    <div className="login animate-fadeIn">
      <div className="frame animate-slideIn">
        <div className="text-wrapper">Register</div>
        <div className="div">
          <div className="frame-2">
            <div className="frame-3">
              <img className="img" src={phUserIcon} alt="User Icon" />
              <input className="input" type="text" placeholder="Username" />
            </div>
            <div className="frame-3">
              <img
                className="img"
                src={carbonPasswordIcon}
                alt="Password Icon"
              />
              <input className="input" type="password" placeholder="Password" />
            </div>
          </div>
          <button className="div-wrapper">
            <div className="text-wrapper-3 ">Register</div>
          </button>
        </div>
        <div className="frame-4">
          <div className="text-wrapper-4">Have account already?</div>
          <a href="#" className="text-wrapper-5">
            Login.
          </a>
        </div>
      </div>
      <div
        className="image-section"
        style={{ backgroundImage: `url(${rectangleImage})` }}
      ></div>
    </div>
  );
};

export default Register;
