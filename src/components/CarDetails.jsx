import React, { useEffect } from 'react';
import '../scss/components/_carDetails.scss';
import backgroundImage from '../assets/images/carDetailsBackground.svg';

const CarDetails = ({ car, onClose }) => {
  if (!car) return null;

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const specs = [
    { label: 'SEATS', value: car.seats },
    { label: 'FUEL TYPE', value: car.fuelType },
    { label: 'TRANSMISSION', value: car.transmission },
    { label: 'VEHICLE CATEGORY', value: car.car_category[0].category_name},
    // { label: 'STATUS', value: 'NOT AVAILABLE', isStatus: true },
    { label: 'STATUS', value: car.available ? 'AVAILABLE' : 'NOT AVAILABLE', isStatus: true },
  ];

  
  const features = car.features?.split(',').map(f => f.trim()).filter(Boolean) || [];

  return (
    <div className="carDetails-overlay">
      <div className="carDetails-popup" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {car.available && <span className="earlyBirdBadge">EARLY BIRD SPECIAL</span>}
        
        <button className="close-button" onClick={onClose}>&times;</button>

        <div className="carDetails-content">
          <div className="carDetails-left">
            <img 
              src={`http://localhost:3011/${car.image}`} 
              alt={`${car.brand} ${car.model}`} 
              className="car-image"
            />
          </div>

          <div className="carDetails-right">
            <div className="price-info">
              <div className="price-main">
                <span className="amount">{car.price}</span>
                <div className="price-period">
                  <span className="currency">€</span>
                  <span className="period">/Day</span>
                </div>
              </div>
              <div className="total-price">
                <span className="total-amount">{car.price * 7}€</span>
                <span className="label">TOTAL PRICE</span>
              </div>
            </div>

            <div className="specs-grid">
              {specs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className={`spec-value ${spec.isStatus ? (spec.value === 'AVAILABLE' ? 'available' : 'not-available') : ''}`}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {features.length > 0 && (
              <div className="features-section">
                <h3>FEATURES</h3>
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <span key={index} className="feature-badge">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}


            <button className="choose-button">Choose</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
