import React from "react";
import RentAcLogo from "../../assets/images/Logo.svg";
import "../../scss/sections/_signUp.scss"
import SignUpHeaderTitle from "../../assets/images/SignUpTGS.svg"

export default function SignUp() {
  return (
    <div className="signUp container">
      <header>
        <div className="logo">
          <img src={RentAcLogo} alt="" />
        </div>
      </header>
      <div className="signUpHeader">
        <img src={SignUpHeaderTitle} alt="" />
      </div>
    </div>
  );
}
