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
    <div className="rentalDateModal">
      <div className="dateClose">
        <h1>Choose date</h1>
        <img src={xIcon} alt="close" onClick={props.onConfirm} />
      </div>
      <div>
        <input type="text" />
      </div>
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
