import React from 'react';
import { FaKey, FaSearch, FaFilter } from 'react-icons/fa';
import "../scss/_pages.scss";

const Rentals = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaKey className="page-icon" /> Active rentals need to be completed</h1>
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search rentals..." />
          </div>
          <button className="filter-btn">
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      <div className="rentals-grid">
        {/* Sample rental cards */}
        {[1, 2, 3, 4].map((rental) => (
          <div key={rental} className="rental-card">
            <div className="rental-header">
              <h3>Rental #{rental}0234</h3>
              <span className="status active">Active</span>
            </div>
            <div className="rental-details">
              <p><strong>Vehicle:</strong> BMW X5 2023</p>
              <p><strong>Customer:</strong> John Doe</p>
              <p><strong>Start Date:</strong> 2024-02-15</p>
              <p><strong>End Date:</strong> 2024-02-20</p>
              <p><strong>Total Cost:</strong> $450.00</p>
            </div>
            <div className="rental-actions">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">End Rental</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rentals;
