import React, { useState } from "react";
import RentAcLogo from "../../assets/images/Logo.svg";
import "../../scss/sections/_signUp.scss";
import SignUpHeaderTitle from "../../assets/images/SignUpTGS.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3011/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ token: res.data.token, username: res.data.username })
        );
        navigate("/mainPage");
        console.log("Login successful", res.data);
      })
      .catch((err) => {
        console.log("Login error", err);
      });
  };

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
      <div className="signUpWrapper">
        <div className="signUpTop">
          <form className="signUpForm" onSubmit={handleSubmit}>
            <div className="inputGroup">
              <input
                className="signinInput"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <input
                className="signinInput"
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="linkWrapper">
              <button className="signup-button" type="submit">
                Sign In
              </button>
              <Link to="/signup">Dont have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
