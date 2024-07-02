import React from "react";
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/sections/_startPage.scss";
import "../scss/layout/_layouts.scss";
import ReusableButton from "../components/ReusableButton";
import CarImageStart from "../assets/images/CarImageStartP.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function StartPage() {
  return (
    <div className="startPage container">
      <header>
        <div className="logo">
          <img src={RentAcLogo} alt="" />
        </div>
        <nav>
          <Link to="/signup">
            <ReusableButton padding="9px 18px">Sign up</ReusableButton>
          </Link>
        </nav>
      </header>
      <section className="getStarted">
        <div className="flexImgText">
          <div className="CarImageStart">
            <img src={CarImageStart} alt="" />
          </div>
          <div className="gSTexts">
            <h1>
              Need a car? <br /> Rent it quickly now!
            </h1>
            <p>You can choose your ideal car and book it easily.</p>
            <div className="gSBtn">
              <Link to="/signin">
                 <ReusableButton padding="9px 31px">Let’s Go</ReusableButton>
              </Link>
            </div>
          </div>
        </div>

        <div className="whatDWO">
          <h2>What do we offer</h2>

          <div className="textBoxCtn">
            <div className="textBox">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
            <div className="textBox">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
