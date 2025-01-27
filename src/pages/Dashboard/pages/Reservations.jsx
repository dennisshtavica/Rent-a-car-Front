import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaSearch, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:3011/allBookings", {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        // Get current date
        const currentDate = new Date();
        
        // Filter bookings within next 3 days
        const upcomingReservations = response.data.filter(booking => {
          const pickupDate = new Date(booking.rentalDate.from);
          const timeDiff = pickupDate.getTime() - currentDate.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          return daysDiff >= 0 && daysDiff <= 3;
        });

        setReservations(upcomingReservations);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredReservations = reservations
    .filter(reservation => {
      if (filter === 'all') return true;
      return reservation.booking_status.toLowerCase() === filter.toLowerCase();
    })
    .filter(reservation => {
      const searchStr = searchTerm.toLowerCase();
      return (
        reservation.user?.username?.toLowerCase().includes(searchStr) ||
        `${reservation.car.brand} ${reservation.car.model}`.toLowerCase().includes(searchStr)
      );
    });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaCalendarAlt className="page-icon" /> Upcoming Reservations</h1>
      </div>

      <div className="reservations-container">
        <div className="reservations-actions">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-options">
            <FaFilter />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Reservations</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="reservations-grid">
          {filteredReservations.map((reservation) => (
            <div key={reservation._id} className="reservation-card">
              <div className="car-info">
                <img 
                  src={`http://localhost:3011/${reservation.car.image}`}
                  alt={`${reservation.car.brand} ${reservation.car.model}`}
                  className="car-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'placeholder-car-image.jpg';
                  }}
                />
                <div className="car-details">
                  <h3>{reservation.car.brand} {reservation.car.model}</h3>
                  <p className="customer-name">{reservation.user?.username}</p>
                </div>
                <span className={`status-badge ${getStatusColor(reservation.booking_status)}`}>
                  {reservation.booking_status}
                </span>
              </div>

              <div className="reservation-details">
                <div className="date-range">
                  <div className="date">
                    <label>Pickup Date</label>
                    <p>{formatDate(reservation.rentalDate.from)}</p>
                  </div>
                  <div className="date">
                    <label>Return Date</label>
                    <p>{formatDate(reservation.rentalDate.to)}</p>
                  </div>
                </div>
                <div className="price">
                  <label>Total Price</label>
                  <p>€{reservation.car.price}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredReservations.length === 0 && (
            <div className="no-reservations">
              <p>No upcoming reservations found within the next 3 days.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
