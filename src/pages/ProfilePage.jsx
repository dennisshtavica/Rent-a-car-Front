import React, {useState} from "react";
import Header from "../components/Header";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import UpdateProfileModal from "../components/UpdateProfileModal";
import "../scss/sections/_profilePage.scss";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateProfileV, setIsUpdateProfileV] = useState(false);

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

  const updateProfileStyle = {
    padding: "10px",
    borderRadius: "13px",
    width: "10%",
    border: "1px solid #171717",
    color: "white",
    textAlign: "center",
    cursor: "pointer",
    color: "black",
  }
  
  const logout = () => {
    if(user) {
      window.localStorage.removeItem("user")
      navigate("/");
    }
  }

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleEditProfile = () => {
    setIsUpdateProfileV(!isUpdateProfileV);
  }


  
  if (!user) {
    return <SignIn />;
  }


  return (
    <div className="container">
      <Header isOpen={isOpen} toggleMenu={toggleMenu} closeMenu={closeMenu}/>
      <div>
        <h1 style={{ marginBottom: "15px" }}>Profile</h1>
        <div style={{ marginBottom: "15px" }} className="profileInputs">
          <h3 style={{ marginBottom: "5px" }}>Username</h3>
          <p style={usernameStyle}>{user.username}</p>
        </div>
        <div style={{ marginBottom: "25px" }} className="profileInputs">
          <h3 style={{ marginBottom: "5px" }}>Email</h3>
          <p style={usernameStyle}>{user.email}</p>
        </div>
        <div style={{display: 'flex', gap: '10px'}}>
          <div style={updateProfileStyle} onClick={() => toggleEditProfile()} className="updateProfile">
            <p>Update profile</p>
          </div>
          <div style={logoutStyle} onClick={logout} className="logoutBtn">
              <p>Logout</p>
          </div>
        </div>
        {isUpdateProfileV && <UpdateProfileModal onConfirm={toggleEditProfile} />}
      </div>
    </div>
  );
}
