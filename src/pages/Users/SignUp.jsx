import React, {useState} from "react";
import RentAcLogo from "../../assets/images/Logo.svg";
import "../../scss/sections/_signUp.scss"
import SignUpHeaderTitle from "../../assets/images/SignUpTGS.svg"
import GoogleIcon from "../../assets/images/google.png"
import {Link} from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
                        <button className="signup-button">Sign Up</button>
                        <Link to="/signin">Already have an account?</Link>
                    </div>
                </form>
            </div>
            <div className="signUpBot">
                <p>OR</p>
                <div className="google-signin">
                    <button className="google-button">
                        <img src={GoogleIcon} alt="Google" className="googleIcon"/>
                        Sign in with Google
                    </button>
                </div>
            </div>
      </div>
    </div>
  );
}
