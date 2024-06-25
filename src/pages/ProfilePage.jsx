import React from "react";
import Header from "../components/Header";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

  const usernameStyle = {
    padding: "10px",
    border: "2px solid #8C8BBF",
    borderRadius: "13px",
    width: "30%",
  };

  const logoutStyle = {
    padding: "10px",
    borderRadius: "13px",
    width: "10%",
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    cursor: "pointer"
  };
  
  const logout = () => {
    if(user) {
      window.localStorage.removeItem("user")
      navigate("/");
    }
  }

  
  if (!user) {
    return <SignIn />;
  }


  return (
    <div className="container">
      <Header />
      <div>
        <h1 style={{ marginBottom: "15px" }}>Profile</h1>
        <div style={{ marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "5px" }}>Username</h3>
          <p style={usernameStyle}>{user.username}</p>
        </div>
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ marginBottom: "5px" }}>Email</h3>
          <p style={usernameStyle}>{user.email}</p>
        </div>
        <div style={logoutStyle} onClick={logout}>
            <p>Logout</p>
        </div>
      </div>
    </div>
  );
}
