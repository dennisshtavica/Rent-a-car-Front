import React, { useState } from "react";
import RentAcLogo from "../../assets/images/Logo.svg";
import "../../scss/sections/_signUp.scss";
import SignInHeaderTitle from "../../assets/images/SignInTGS.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";

export default function SignIn() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");


  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        "http://localhost:3011/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { 
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ token: res.data.token, username: res.data.username, email: res.data.email, id: res.data.id})
        );
        setTimeout(() => {
          setLoading(false);
          navigate("/mainPage");
        }, 1500);
        console.log("Login successful", res.data);
      })
      .catch((err) => {
        console.log("Login error", err);
        setErrors(err.response.data.message);
      });
  };

  return (
    <div className="signUp container">
      <header>
        <Link to="/">
          <div className="logo">
            <img src={RentAcLogo} alt="" />
          </div>
        </Link>
     
      </header>
      <div className="signUpbody">
        <div className="signUpHeader">
          <img src={SignInHeaderTitle} alt="" />
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
                  {loading ? (
                    <PulseLoader color="#fff" size={8} />
                  ): (
                    "Sign In"
                  )}
                </button>
                <Link to="/signup">Dont have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}