import React from "react";
import "../scss/components/_carCard.scss";
import backgroundImage from "../assets/images/cardBackground.svg";
import carImage from "../assets/images/troc.svg";
import seatImage from "../assets/images/seat.svg";
import fuelImage from "../assets/images/fuel-pump.svg";

export default function CarCard({ model, pricePerDay, totalPrice, features, isEarlyBird, distance }) {
  return (
    <div className="carCard" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {isEarlyBird && <span className="earlyBirdBadge">EARLY BIRD SPECIAL</span>}
      <h3 className="carModel">{model}</h3>
      <div className="carImageContainer">
        <img src={carImage} alt={model} className="carImage" />
      </div>
      <div className="priceSection">
        <div className="pricePerDay">
          <span className="amount">{pricePerDay}€</span>
          <span className="period">/Day</span>
        </div>
        <div className="totalPrice">
          <span>{totalPrice}€</span>
          <span className="label">TOTAL PRICE</span>
        </div>
      </div>
      <div className="features">
        {features.map((feature, index) => (
          <span key={index} className="featureBadge">
            {index === 0 && <img src={seatImage} alt="Seats" className="featureIcon" />}
            {index === 1 && <img src={fuelImage} alt="Fuel" className="featureIcon" />}
            {feature}
          </span>
        ))}
      </div>
      {distance && <div className="distance">{distance}</div>}
    </div>
  );
}
