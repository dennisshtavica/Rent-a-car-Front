
import React, { useState } from "react";
import RentAcLogo from "../../assets/images/Logo.svg";
import "../../scss/sections/_signUp.scss";
import SignUpHeaderTitle from "../../assets/images/SignUpTGS.svg";
import GoogleIcon from "../../assets/images/google.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        "http://localhost:3011/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      )
      .then((res) => {
        setUsername("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setLoading(false);
        },
        2000);
        console.log("Successful signup", res);

       
      })
      .catch((err) => {
        console.log("error", err);
        setError(
          ( err.response.data.message === 'User already exist with the given email'
            ? 'User already exist with the given email' :
             '') || (err.response.data.message === 'Invalid email format' ? 'Invalid email format' : ''));
         setPasswordError(err.response.data.message === 'Password must be at least 8 characters long, contain at least one number and one uppercase letter' ? 'Password must be at least 8 characters long, contain at least one number and one uppercase letter' : '');
      })
      .finally(() => {
        setLoading(false);
        setFormSubmitted(true);
      })
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
                  // required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {(formSubmitted && email === '' ? <span>Email is required</span> : "") || error} 
              </div>
              <div className="inputGroup">
                <input
                  className="signinInput"
                  type="username"
                  name="username"
                  // required
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {formSubmitted && !username && <span>Username is required</span>}
              </div>
              <div className="inputGroup">
                <input
                  className="signinInput"
                  type="password"
                  name="password"
                  // required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p>{(formSubmitted && password === '' ? 'Password is required' : '') || (password.length > 8 && !passwordError ? "" : passwordError)}</p> 
              </div>
              <div className="linkWrapper">
                <button className="signup-button" type="submit">
                  {loading ? (
                    <PulseLoader color="#fff" size={8} />
                  ): (
                    "Sign Up"
                  )}
                </button>
                <Link to="/signin">Already have an account?</Link>
              </div>
            </form>
          </div>
          <div className="signUpBot">
            <p>OR</p>
            <div className="google-signin">
              <button className="google-button">
                <img src={GoogleIcon} alt="Google" className="googleIcon" />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

