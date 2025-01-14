import React from "react";
import ReactDOM from "react-dom";
import "../../scss/components/_rentalDateModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPickupLocation } from "../../app/slices/bookingSlice";
import pinPoint from "../../assets/images/pinpoint.svg";
import xIcon from "../../assets/images/xIcon.svg";


const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="rentalDateModal pickUpLocationModal">
      <div className="dateClose">
        <h1>Choose Pick up Location</h1>
        <img src={xIcon} alt="close" onClick={props.onConfirm} />
      </div>
      <div className="locationInput">
        <img src={pinPoint} alt="pinpoint" className="pinpoint-icon" />
        <input type="text" placeholder="Type your location"/>
      </div>
      <button className="saveBtn">Save</button>
    </div>
  );
};


export default function PickUpLocationModal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById("overlay-root"))}
        </>
    );
}
