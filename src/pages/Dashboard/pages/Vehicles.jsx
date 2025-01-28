import React, { useState, useEffect } from 'react';
import { FaCar, FaSearch, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";
import AddCarsForm from '../components/AddCarsForm';
import EditCarsForm from '../components/EditCarsForm';

const Vehicles = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

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

  const handleDeleteCar = async (carId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (!user || !user.token) {
        setError("No authentication token found. Please login again.");
        return;
      }

      await axios.delete(`http://localhost:3011/cars/${carId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      fetchCars();
      setShowDeleteConfirm(false);
      setSelectedCar(null);
      
    } catch (error) {
      console.error("Error deleting car:", error);
      alert(error.response?.data?.message || "Failed to delete car");
    }
  };

  useEffect(() => {
    fetchCars();
    // alert("Per me testu EDIT duhesh 2 tfundit (porsche Cayenne)");
  }, []);

  const handleAddCarSuccess = () => {
    setIsAddModalOpen(false);
    fetchCars();
  };

  const handleEditClick = (car) => {
    setEditingCar(car);
  };

  const DeleteConfirmation = () => {
    if (!showDeleteConfirm) return null;
    
    return (
      <div className="modal-overlay">
        <div className="modal-content delete-confirm">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this car? This action cannot be undone.</p>
          <div className="form-actions">
            <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
              Cancel
            </button>
            <button 
              onClick={() => handleDeleteCar(selectedCar._id)} 
              className="btn-primary delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

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
          <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
            <FaPlus /> Add Vehicle
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <AddCarsForm 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddCarSuccess}
        />
      )}

      {editingCar && (
        <EditCarsForm 
          car={editingCar}
          onClose={() => setEditingCar(null)}
          onSuccess={() => {
            setEditingCar(null);
            fetchCars();
          }}
        />
      )}

      <DeleteConfirmation />

      <div className="vehicles-grid">
        {cars.map((car) => (
          <div key={car._id} className="vehicle-card">
            <div className="vehicle-image">
              <img 
                src={`http://localhost:3011/${car.image}`} 
                alt={`${car.brand} ${car.model}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'placeholder-image-url'; 
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
              <button 
                className="btn-primary" 
                onClick={() => handleEditClick(car)}
              >
                Edit
              </button>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setSelectedCar(car);
                  setShowDeleteConfirm(true);
                }}
              >
                Delete Car
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
