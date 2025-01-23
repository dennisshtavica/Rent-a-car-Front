import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaSearch, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";

const Reservations = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:3011/getCars", {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Sample reservation data with actual car data
  const reservations = [
    {
      id: 1,
      customer: "John Doe",
      car: cars[0] || { brand: "Loading...", model: "", image: "" },
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      status: "Active",
      totalPrice: 450
    },
    {
      id: 2,
      customer: "Jane Smith",
      car: cars[1] || { brand: "Loading...", model: "", image: "" },
      startDate: "2024-03-18",
      endDate: "2024-03-25",
      status: "Pending",
      totalPrice: 560
    },
    {
      id: 3,
      customer: "Mike Johnson",
      car: cars[2] || { brand: "Loading...", model: "", image: "" },
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      status: "Completed",
      totalPrice: 240
    }
  ];

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
      return reservation.status.toLowerCase() === filter.toLowerCase();
    })
    .filter(reservation => {
      const searchStr = searchTerm.toLowerCase();
      return (
        reservation.customer.toLowerCase().includes(searchStr) ||
        `${reservation.car.brand} ${reservation.car.model}`.toLowerCase().includes(searchStr)
      );
    });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaCalendarAlt className="page-icon" /> Reservations</h1>
      </div>

      <div className="reservations-container">
        {/* Filters and Search */}
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Reservations Grid */}
        <div className="reservations-grid">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
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
                  <p className="customer-name">{reservation.customer}</p>
                </div>
                <span className={`status-badge ${getStatusColor(reservation.status)}`}>
                  {reservation.status}
                </span>
              </div>

              <div className="reservation-details">
                <div className="date-range">
                  <div className="date">
                    <label>Start Date</label>
                    <p>{formatDate(reservation.startDate)}</p>
                  </div>
                  <div className="date">
                    <label>End Date</label>
                    <p>{formatDate(reservation.endDate)}</p>
                  </div>
                </div>
                <div className="price">
                  <label>Total Price</label>
                  <p>€{reservation.totalPrice}</p>
                </div>
              </div>

              <div className="card-actions">
                <button className="btn-primary">View Details</button>
                <button className="btn-secondary">Update Status</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
