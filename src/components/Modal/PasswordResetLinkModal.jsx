import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../scss/components/_passwordResetModal.scss";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const Backdrop = (props) => {
  return <div onClick={props.onConfirm} className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      return;
    }

    axios
      .post(`http://localhost:3011/reset-password`, {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        setLinkSent(true);
        setSuccessMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBackToLogin = () => {
    props.isForgetPasswordClicked(false);
  };

  return (
    <div className="reset-password-modal">
      <div className="modal-content">
        <button className="close-button" onClick={handleBackToLogin}>
          ×
        </button>
        <h2>Reset Password</h2>
        <p>Enter your email address to receive a password reset link</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={linkSent || isLoading}
            />
          </div>
          <button
            type="submit"
            className={`submit-button ${linkSent ? "success" : ""}`}
            disabled={linkSent || isLoading}
          >
            {isLoading ? (
              <PulseLoader color="#fff" size={8} />
            ) : linkSent ? (
              "Check your email"
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function PasswordResetLinkModal(props) {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          isForgetPasswordClicked={props.isForgetPasswordClicked}
        />,
        document.getElementById("overlay-root")
      )}
    </div>
  );
}
