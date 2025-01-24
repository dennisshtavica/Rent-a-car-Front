import React, { useEffect, useState } from 'react';
import '../scss/components/_carDetails.scss';
import backgroundImage from '../assets/images/carDetailsBackground.svg';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';

const CarDetails = ({ car, onClose }) => {
  const dispatch = useDispatch();
  const { rentalDate } = useSelector((state) => state.booking);
  const [features, setFeatures] = useState([]);
  const [category, setCategory] = useState('');
  
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          console.error('No user data found');
          return;
        }

        const userData = JSON.parse(userString);
        const token = userData.token;
        
        if (!token) {
          console.error('No token found in user data');
          return;
        }

        const carResponse = await fetch(`http://localhost:3011/getCars`, {
          headers: {
            'Authorization': `Bearer ${token.trim()}`,
            'Content-Type': 'application/json'
          }
        });

        if (!carResponse.ok) {
          throw new Error(`HTTP error! status: ${carResponse.status}`);
        }

        const cars = await carResponse.json();
        
        const currentCar = cars.find(c => c._id === car._id);
        
        if (currentCar) {
          if (currentCar.car_features && Array.isArray(currentCar.car_features)) {
            const carFeatures = currentCar.car_features.map(feature => {
              return feature.feature_name;
            });
            setFeatures(carFeatures);
          }

          // Handle category
          if (currentCar.car_category && currentCar.car_category.category_name) {
            setCategory(currentCar.car_category.category_name);
          }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.message.includes('401')) {
          console.log('Authentication error - please log in again');
        }
      }
    };

    if (car) {
      fetchData();
    }
  }, [car]);


  const specs = [
    { label: 'SEATS', value: car.seats },
    { label: 'FUEL TYPE', value: car.fuelType },
    { label: 'TRANSMISSION', value: car.transmission },
    { label: 'VEHICLE CATEGORY', value: category || 'Loading...' },
    { label: 'FEATURES', value: features, isFeatures: true },
    { label: 'STATUS', value: car.available ? 'AVAILABLE' : 'NOT AVAILABLE', isStatus: true },
  ];

  const calculateTotalPrice = () => {
    if (rentalDate.from && rentalDate.to) {
      const days = differenceInDays(rentalDate.to, rentalDate.from) + 1;
      return car.price * days;
    }
    return car.price; 
  };

  const handleChoose = () => {
    dispatch({
      type: 'booking/setSelectedCar',
      payload: {
        car,
        totalPrice: calculateTotalPrice()
      }
    });
    onClose();
  };

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
                  {spec.isFeatures ? (
                    <div className="features-list">
                      {features.map((feature, index) => (
                        <span key={index} className="feature-item">
                          {feature}
                          {index < features.length - 1 && <span className="feature-separator">•</span>}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className={`spec-value ${spec.isStatus ? (spec.value === 'AVAILABLE' ? 'available' : 'not-available') : ''}`}>
                      {spec.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button 
              className="choose-button" 
              onClick={handleChoose}
              disabled={!rentalDate.from || !rentalDate.to}
            >
              {!rentalDate.from || !rentalDate.to 
                ? 'Please select dates first' 
                : 'Choose'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
