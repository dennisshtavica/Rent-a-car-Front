import React from "react";
import "../scss/components/_carCard.scss";
import pickupimg from "../assets/images/location.png";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function CarRentedCard(props) {
  return (
    <div className="cardWrapper">
      <div className="cardContainer">
        <div className="cardSpecs">
          <div className="carPhoto">
            <img src={`http://localhost:3011/${props.image}`} />
          </div>
          <div className="carInfo">
            <p className="carBrand">{props.name}</p>
            <p className="carModel">{props.model}</p>

            <p className="carType">{props.seats}</p>
            <p className="carType">{props.transmission}</p>
            <p className="carType">{props.range}</p>
            <span style={{display: 'flex', alignItems: 'center'}}>
              <img src={pickupimg} alt="" style={{width: '25px', height: '25px'}} />
              <p className="carType">{props.pickupLocation}</p>
            </span>
          </div>
        </div>
        <div className="carPrice">
          <p>{props.formattedDates}</p>
            <button onClick={props.handleCancelBooking} style={{
              background: '#FD8686'
            }}>
              {props.loading ? <PulseLoader color="#fff" size={8} /> : "Cancel"}
            </button>
        </div>
      </div>
    </div>
  );
}
