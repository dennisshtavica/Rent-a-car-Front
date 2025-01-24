import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import "../scss/_pages.scss";
const carFeatures = [
  "GPS Navigation",
  "Air Suspension",
  "360 Camera",
  "Cruise Control",
  "Autonomous Parking",
  "Massage Seats",
  "Sunroof",
  "3 zone climate control",
  "Apple CarPlay",
  "Android Auto"
];

const carCategories = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Wagon",
  "Convertible",
];

const AddCarsForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    image: null,
    seats: '',
    transmission: '',
    price: '',
    year: new Date().getFullYear(),
    fuelType: '',
    car_features: [],
    car_category: ''
  });

  const [features, setFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Log the API URLs being called
        console.log('Fetching from:', {
          features: 'http://localhost:3011/features',
          categories: 'http://localhost:3011/categories'
        });

        const [featuresRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:3011/features'),
          axios.get('http://localhost:3011/categories')
        ]);

        console.log('API responses:', {
          features: featuresRes.data,
          categories: categoriesRes.data
        });

        setFeatures(featuresRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load features and categories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleFeatureToggle = (featureId) => {
    setFormData(prev => ({
      ...prev,
      car_features: prev.car_features.includes(featureId)
        ? prev.car_features.filter(f => f !== featureId)
        : [...prev.car_features, featureId]
    }));
    console.log('Updated features:', formData.car_features);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    console.log('Selected category:', categoryId);
    setFormData(prev => ({
      ...prev,
      car_category: categoryId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = new FormData();
      
      // Log the form data before submission
      console.log('Form data before submission:', formData);

      // Validate required fields
      if (!formData.brand || !formData.model || !formData.image || 
          !formData.seats || !formData.transmission || !formData.price || 
          !formData.fuelType || !formData.car_category) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'car_features') {
          // Only append features if array is not empty
          if (formData[key] && formData[key].length > 0) {
            formData[key].forEach(feature => {
              data.append('car_features[]', feature);
            });
          }
        } else if (key === 'image') {
          if (formData.image) {
            data.append('image', formData.image);
          }
        } else if (key === 'car_category') {
          // Send car_category as a single value, not an array
          data.append('car_category', formData.car_category);
        } else {
          data.append(key, formData[key]);
        }
      });

      // Log what's being sent
      console.log('FormData entries being sent:');
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post('http://localhost:3011/addCar', data, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Success response:', response.data);
      
      // Call onSuccess only after successful submission
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
      
    } catch (error) {
      console.error('Error adding car:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        alert(`Error: ${error.response.data.error || 'Failed to add car'}`);
      }
    }
  };

  return (
    <div className="add-car-modal-overlay">
      <div className="add-car-modal">
        <div className="add-car-header">
          <h2>Add New Vehicle</h2>
          <button onClick={onClose} className="add-car-close-btn">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-car-form">
          <div className="form-grid">
            <div className="add-car-input-group">
              <label>Brand</label>
              <input
                type="text"
                required
                placeholder="Enter brand name"
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="modern-input"
              />
            </div>

            <div className="add-car-input-group">
              <label>Model</label>
              <input
                type="text"
                required
                placeholder="Enter model name"
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                className="modern-input"
              />
            </div>

            <div className="add-car-input-group">
              <label>Image</label>
              <input
                type="file"
                required
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                className="modern-file-input"
              />
            </div>

            <div className="add-car-input-group">
              <label>Seats</label>
              <input
                type="number"
                required
                placeholder="Number of seats"
                min="1"
                max="9"
                onChange={(e) => setFormData({...formData, seats: e.target.value})}
                className="modern-input"
              />
            </div>

            <div className="add-car-input-group">
              <label>Transmission</label>
              <select
                required
                onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                className="modern-select"
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            <div className="add-car-input-group">
              <label>Price per Day (€)</label>
              <input
                type="number"
                required
                placeholder="Enter price"
                min="0"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="modern-input"
              />
            </div>

            <div className="add-car-input-group">
              <label>Year</label>
              <input
                type="number"
                required
                value={formData.year}
                min="1900"
                max={new Date().getFullYear()}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="modern-input"
              />
            </div>

            <div className="add-car-input-group">
              <label>Fuel Type</label>
              <select
                required
                onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                className="modern-select"
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading features and categories...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <div className="add-car-input-group full-width">
                <label>Car Category</label>
                <select
                  required
                  onChange={handleCategoryChange}
                  value={formData.car_category}
                  className="modern-select"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="add-car-features-group full-width">
                <label>Car Features</label>
                <div className="add-car-features-grid">
                  {features.map(feature => (
                    <label key={feature._id} className="feature-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.car_features.includes(feature._id)}
                        onChange={() => handleFeatureToggle(feature._id)}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="feature-label">{feature.feature_name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="add-car-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarsForm;
