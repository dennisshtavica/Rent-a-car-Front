import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../scss/components/_passwordResetModal.scss";
import axios from "axios";
import { useParams } from "react-router-dom";


const Backdrop = (props) => {
  return <div onClick={props.onConfirm} className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsReset, setPasswordIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetToken } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      return;
    }

      axios
        .put(
          `http://localhost:3011/reset-password/${resetToken}`,
          {
            newPassword: newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((res) => {
          console.log(res);
          setPasswordIsReset(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

  };


  return (
    <div className="passwordResetModal">
      <div className="firstRow">
        <p className="resetPp">
          {passwordIsReset ? "Password reset" : "Change password"}
        </p>
      </div>
      <div className="emailInput">
        {passwordIsReset ? (
          <div className="passwordResetBody">
            <p>The password has been successfully changed.</p>
            <div className="continueBtn" onClick={props.onConfirm}>
              Continue
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                name=""
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type={showPassword ? "text" : "password"}
                name=""
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="showPasswordCtn">
                <input
                  id="check"
                  type="checkbox"
                  value={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label htmlFor="check">Show Password</label>
              </div>

              <button type="submit">
                Confirm
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default function ResetPasswordModal(props) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        props.onConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.onConfirm]);

  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={props.onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </div>
  );
}
