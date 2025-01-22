import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import "../../scss/components/_rentalDateModal.scss";
import { DayPicker } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import { setRentalDate } from '../../app/slices/bookingSlice';
import xIcon from "../../assets/images/xIcon.svg";

const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onConfirm} ></div>;
};

const ModalOverlay = (props) => {
    const dispatch = useDispatch();
    const rentalDate = useSelector((state) => state.booking.rentalDate);

    const handleRentalDate = (range) => {
        const { from, to } = range;
        dispatch(setRentalDate({ from, to })); 
    };

    return (
      <div className="rentalDateModal">
        <div className='dateClose'>
            <h1>Choose date</h1>
            <img src={xIcon} alt="close" onClick={props.onConfirm} />
        </div>
        <DayPicker
            mode='range'
            selected={rentalDate}  
            onSelect={handleRentalDate}
        />
        
      </div>
    );
}

export default function RentalDateModal(props) {
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
