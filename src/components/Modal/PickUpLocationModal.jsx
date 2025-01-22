import React, {useState, useEffect} from "react";
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
  const dispatch = useDispatch();
  const [location, setLocation] = useState(""); 

  const handleInputChange = (e) => {
    setLocation(e.target.value); 
  }

  const handleSave = () => {
    dispatch(setPickupLocation(location)); 
    props.onConfirm(); 
  };


  return (
    <div className="rentalDateModal pickUpLocationModal">
      <div className="dateClose">
        <h1>Choose Pick up Location</h1>
        <img src={xIcon} alt="close" onClick={props.onConfirm} />
      </div>
      <div className="locationInput">
        <img src={pinPoint} alt="pinpoint" className="pinpoint-icon" />
        <input
          type="text" 
          placeholder="Type your location (e.g. city, street, etc.)"
          value={location}
          onChange={handleInputChange}
        />
      </div>
      <button 
        className="saveBtn"
        onClick={handleSave}
      >Save</button>
    </div>
  );
};


export default function PickUpLocationModal(props) {
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
        <>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<ModalOverlay onConfirm={props.onConfirm}>{props.children}</ModalOverlay>, document.getElementById("overlay-root"))}
        </>
    );
}
