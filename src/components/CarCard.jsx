import React, { useState } from "react";
import "../scss/components/_carCard.scss";
import backgroundImage from "../assets/images/cardBackground.svg";
import defaultCarImage from "../assets/images/troc.svg";
import seatImage from "../assets/images/seat.svg";
import fuelImage from "../assets/images/fuel-pump.svg";
import CarDetails from "./CarDetails";

export default function CarCard({ 
  model, 
  pricePerDay, 
  totalPrice, 
  features, 
  isEarlyBird, 
  distance,
  image,
  car
}) {
  const [showDetails, setShowDetails] = useState(false);

  const getFeatureIcon = (feature) => {
    if (feature.includes('Seats')) return seatImage;
    if (['Electric', 'Hybrid', 'Diesel', 'Petrol'].includes(feature)) return fuelImage;
    return null;
  };

  return (
    <>
      <div 
        className="carCard" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
        onClick={() => setShowDetails(true)}
      >
        {isEarlyBird && <span className="earlyBirdBadge">EARLY BIRD SPECIAL</span>}
        <h3 className="carModel">{model}</h3>
        <div className="carImageContainer">
          <img 
            src={image || defaultCarImage} 
            alt={model} 
            className="carImage"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultCarImage;
            }}
          />
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
              {(feature.includes('Seats') || ['Electric', 'Hybrid', 'Diesel', 'Petrol'].includes(feature)) && 
                <img src={getFeatureIcon(feature)} alt="" className="featureIcon" />
              }
              {feature}
            </span>
          ))}
        </div>
        {distance && <div className="distance">{distance}</div>}
      </div>
      
      {showDetails && (
        <CarDetails 
          car={car}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
