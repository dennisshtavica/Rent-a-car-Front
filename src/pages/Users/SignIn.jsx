import React, { useState, useEffect } from "react";
import RentAcLogo from "../../assets/images/Logo.svg";
import "../../scss/sections/_signUp.scss";
import "../../scss/layout/_layouts.scss";
import SignInHeaderTitle from "../../assets/images/SignInTGS.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import PasswordResetLinkModal from "../../components/Modal/PasswordResetLinkModal";

export default function SignIn() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [isForgetPasswordClicked, setIsForgetPasswordClicked] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(""); 

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    axios
      .post(
        "http://localhost:3011/login",
        {
          email: trimmedEmail,
          password: trimmedPassword,
        },
        {
          headers: { 
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        
        if (!res.data.token) {
          throw new Error('No token received from server');
        }

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
        
        let errorMessage;
        if (err.response?.status === 401) {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else {
          errorMessage = err.response?.data?.message || 
                        err.response?.data?.error || 
                        "Unable to login. Please try again.";
        }
        
        setErrors(errorMessage);
        setLoading(false);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors(""); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors(""); 
  };

  const handleForgetPasswordClick = (value) => {
    setIsForgetPasswordClicked(value);
  };

  return (
    <div className="signUp container">
      {isForgetPasswordClicked ? (
        <PasswordResetLinkModal isForgetPasswordClicked={handleForgetPasswordClick} />
      ) : (
        <div>
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
            {errors && (
              <div className="error-message" style={{
                color: 'red',
                marginBottom: '1rem',
                textAlign: 'center',
                padding: '10px',
                backgroundColor: '#fff3f3',
                borderRadius: '4px'
              }}>
                {errors}
              </div>
            )}
            <form className="signUpForm" onSubmit={handleSubmit}>
              <div className="inputGroup">
                <input
                  className="signinInput"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
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
                  onChange={handlePasswordChange}
                  minLength="6"
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
                <div className="loginFooter">
                  <p onClick={() => setIsForgetPasswordClicked(true)}>Forgot password?</p>
                  <Link to="/signup">Dont have an account?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      )}
      
    </div>
  );
}