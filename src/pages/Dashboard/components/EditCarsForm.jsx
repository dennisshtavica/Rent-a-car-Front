import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import "../scss/_pages.scss";

const EditCarsForm = ({ car, onClose, onSuccess }) => {
  console.log('Initial car data:', car); // Debug log
  
  const [formData, setFormData] = useState({
    brand: car?.brand || '',
    model: car?.model || '',
    image: null,
    seats: car?.seats || '',
    transmission: car?.transmission || '',
    price: car?.price || '',
    year: car?.year || new Date().getFullYear(),
    fuelType: car?.fuelType || '',
    car_features: car?.car_features?.map(f => f._id) || [],
    car_category: car?.car_category?._id || ''
  });

  console.log('Initial formData:', formData); // Debug log

  const [features, setFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
          throw new Error("No authentication token found");
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        };
        
        const [featuresRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:3011/features', config),
          axios.get('http://localhost:3011/categories', config)
        ]);

        setFeatures(featuresRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || 'Failed to load features and categories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleFeatureToggle = (featureId) => {
    console.log('Toggling feature:', featureId);
    setFormData(prev => {
      const newFeatures = prev.car_features.includes(featureId)
        ? prev.car_features.filter(f => f !== featureId)
        : [...prev.car_features, featureId];
      console.log('New features array:', newFeatures);
      return {
        ...prev,
        car_features: newFeatures
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      // Create a regular object instead of FormData
      const updateData = {
        brand: formData.brand,
        model: formData.model,
        seats: formData.seats,
        transmission: formData.transmission,
        price: formData.price,
        year: formData.year,
        fuelType: formData.fuelType,
        car_category: formData.car_category,
        car_features: formData.car_features // Send features as an array
      };

      // Create FormData only if there's an image
      const data = new FormData();
      
      // Add the JSON data
      data.append('data', JSON.stringify(updateData));
      
      // Add image if present
      if (formData.image) {
        data.append('image', formData.image);
      }

      console.log('Sending update data:', updateData);

      const response = await axios.put(`http://localhost:3011/updateCar/${car._id}`, data, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Success response:', response.data);
      
      if (response.data.car) {
        setFormData(prev => ({
          ...prev,
          ...response.data.car,
          car_features: response.data.car.car_features.map(f => f._id)
        }));
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error updating car:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        alert(`Error: ${error.response.data.error || 'Failed to update car'}`);
      }
    }
  };

  return (
    <div className="edit-vehicle-overlay">
      <div className="edit-vehicle-modal">
        <div className="edit-vehicle-header">
          <h2>Edit Vehicle Details</h2>
          <button onClick={onClose} className="modal-close-btn">
            <FaTimes />
          </button>
        </div>

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <form onSubmit={handleSubmit} className="vehicle-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  required
                  className="form-input"
                  placeholder="Enter brand name"
                />
              </div>

              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                  className="form-input"
                  placeholder="Enter model name"
                />
              </div>

              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                  className="form-file-input"
                />
              </div>

              <div className="form-group">
                <label>Seats</label>
                <input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({...formData, seats: e.target.value})}
                  required
                  className="form-input"
                  min="1"
                  max="9"
                  placeholder="Number of seats"
                />
              </div>

              <div className="form-group">
                <label>Transmission</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                  required
                  className="form-select"
                >
                  <option value="">Select Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price per Day (€)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  className="form-input"
                  min="0"
                  placeholder="Enter daily rate"
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  required
                  className="form-input"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="form-group">
                <label>Fuel Type</label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                  required
                  className="form-select"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Car Category</label>
                <select
                  value={formData.car_category}
                  onChange={(e) => setFormData({...formData, car_category: e.target.value})}
                  required
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="features-section">
              <label>Vehicle Features</label>
              <div className="features-grid">
                {features.map(feature => (
                  <label key={feature._id} className="feature-item">
                    <input
                      type="checkbox"
                      checked={formData.car_features.includes(feature._id)}
                      onChange={() => handleFeatureToggle(feature._id)}
                      className="feature-checkbox"
                    />
                    <span className="feature-name">{feature.feature_name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCarsForm;
