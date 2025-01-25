import React, { useState, useEffect } from "react";
import RentAcLogo from "../../assets/images/Logo.svg";
import "../../scss/sections/_signUp.scss";
import "../../scss/layout/_layouts.scss";
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
        console.log('Login response:', res.data);

        localStorage.setItem(
          "user",
          JSON.stringify({ 
            token: res.data.token,
            username: res.data.username, 
            email: res.data.email, 
            id: res.data.id, 
            role_id: res.data.role_id, 
            phone_number: res.data.phone_number 
          })
        );
        
        localStorage.setItem("token", res.data.token);
        
        
        const overlay = document.createElement('div');
        overlay.className = 'page-transition';
        
        const logo = document.createElement('div');
        logo.className = 'transition-logo';
        logo.innerHTML = `
          <span>
            <span class="drive">Drive</span><span class="hub">hub</span>
          </span>
        `;
        overlay.appendChild(logo);
        document.body.appendChild(overlay);

        setTimeout(() => {
          setLoading(false);
          navigate("/mainPage");
          
          overlay.style.animation = 'pageTransitionIn 2.5s ease-in-out forwards';
          overlay.style.transformOrigin = 'top';
          
          setTimeout(() => {
            overlay.remove();
          }, 2500);
        }, 2500);
      })
      .catch((err) => {
        console.log("Login error", err);
        setErrors(err.response.data.message);
        setLoading(false);
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