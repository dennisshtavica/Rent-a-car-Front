import React, { useState, useEffect } from 'react';
import { FaKey, FaSearch, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const userStr = localStorage.getItem('user');
      const user = JSON.parse(userStr || '{}');
      const token = user.token;

      if (!token) {
        throw new Error('Authentication token missing');
      }

      const response = await axios.get(
        'http://localhost:3011/allBookings',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      
      setRentals(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      setError(error.response?.data?.message || 'Failed to load rentals');
      setLoading(false);
    }
  };

  const filteredRentals = rentals.filter(rental => {
    const matchesSearch = 
      rental.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.user?.username?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || rental.booking_status.toLowerCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateTotalPrice = (rental) => {
    try {
      const startDate = new Date(rental.rentalDate.from);
      const endDate = new Date(rental.rentalDate.to);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      const pricePerDay = rental.car?.price || 0;
      const total = diffDays * pricePerDay;

      return total;
    } catch (error) {
      console.error('Error calculating total amount:', error);
      return 0;
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-title">
          <FaKey className="page-icon" />
          <h1>All Rentals</h1>
        </div>
        <div className="header-actions">
          <div className="rental-search">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by car or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="rentals-stats">
        <div className="stat-card">
          <h3>Total Rentals</h3>
          <p>{rentals.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Rentals</h3>
          <p>{rentals.filter(r => r.booking_status.toLowerCase() === 'confirmed').length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{rentals.filter(r => r.booking_status.toLowerCase() === 'pending').length}</p>
        </div>
      </div>

      <div className="rentals-grid">
        {filteredRentals.map((rental) => (
          <div key={rental._id} className="rental-card">
            <div className="rental-header">
              <h3>Booking #{rental._id.toString().slice(-6)}</h3>
              <span className={`status ${rental.booking_status.toLowerCase()}`}>
                {rental.booking_status}
              </span>
            </div>
            <div className="rental-image">
              <img 
                src={`http://localhost:3011/${rental.car.image}`}
                alt={`${rental.car.brand} ${rental.car.model}`}
              />
            </div>
            <div className="rental-details">
              <div className="detail-row">
                <span className="label">Vehicle:</span>
                <span className="value">{rental.car.brand} {rental.car.model}</span>
              </div>
              <div className="detail-row">
                <span className="label">Customer:</span>
                <span className="value">{rental.user?.username || 'Unknown'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Pickup:</span>
                <span className="value">{rental.pickupLocation}</span>
              </div>
              <div className="detail-row">
                <span className="label">Return:</span>
                <span className="value">{rental.returnLocation}</span>
              </div>
              <div className="detail-row">
                <span className="label">Dates:</span>
                <span className="value">
                  {formatDate(rental.rentalDate.from)} - {formatDate(rental.rentalDate.to)}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Total Price:</span>
                <span className="value">${calculateTotalPrice(rental).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rentals;
