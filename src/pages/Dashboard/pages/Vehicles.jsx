import React, { useState, useEffect } from 'react';
import { FaCar, FaSearch, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";

const Vehicles = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !user.token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3011/getCars", {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          setError("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaCar className="page-icon" /> Vehicle Fleet</h1>
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search vehicles..." />
          </div>
          <button className="add-btn">
            <FaPlus /> Add Vehicle
          </button>
        </div>
      </div>

      <div className="vehicles-grid">
        {cars.map((car) => (
          <div key={car._id} className="vehicle-card">
            <div className="vehicle-image">
              <img 
                src={`http://localhost:3011/${car.image}`} 
                alt={`${car.brand} ${car.model}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'placeholder-image-url'; // Add a placeholder image URL
                }}
              />
            </div>
            <div className="vehicle-details">
              <h3>{car.brand} {car.model}</h3>
              <p className="status">{car.available ? 'Available' : 'Not Available'}</p>
              <div className="specs">
                <span>{car.transmission}</span>
                <span>{car.seats} Seats</span>
                <span>{car.fuelType}</span>
                <span>Year: {car.year}</span>
              </div>
              <p className="price">€{car.price}/day</p>
            </div>
            <div className="vehicle-actions">
              <button className="btn-primary">Edit</button>
              <button className="btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
