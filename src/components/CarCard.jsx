import React from "react";
import "../scss/components/_carCard.scss";
import CarPhotos from "../assets/images/car.png";
import { Link } from "react-router-dom";

export default function CarCard(props) {
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
          </div>
        </div>
        <div className="carPrice">
          <p>{props.price}€/day</p>
          <Link to={`/bookingPage/${props._id}`}>
            <button>Book</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
