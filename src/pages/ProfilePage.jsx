import React, {useState} from "react";
import Header from "../components/Header";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import UpdateProfileModal from "../components/UpdateProfileModal";
import "../scss/sections/_profilePage.scss";
import SignIn from "./Users/SignIn";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateProfileV, setIsUpdateProfileV] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

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
    <>
      <div className="mainPage container">
                <Header isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} closeMenu={() => setIsOpen(false)} />
      </div>
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-field-group">
          <h3>Username</h3>
          <p>{user.username}</p>
        </div>
        <div className="profile-field-group">
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
        <div className="profile-buttons-container">
          <div className="profile-update-btn" onClick={toggleEditProfile}>
            <p>Update profile</p>
          </div>
          <div className="profile-logout-btn" onClick={logout}>
            <p>Logout</p>
          </div>
        </div>
        {isUpdateProfileV && <UpdateProfileModal onConfirm={toggleEditProfile} />}
      </div>
    </>
  );
}
