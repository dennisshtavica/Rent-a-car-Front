import React from 'react';
import { FaChartBar, FaCarSide, FaUsers, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import "../scss/_pages.scss";

const Reports = () => {
  // Sample data - replace with actual data later
  const statistics = {
    totalBookings: 156,
    totalRevenue: 25600,
    activeVehicles: 24,
    totalCustomers: 89,
    recentBookings: [
      { id: 1, customer: "John Doe", car: "BMW X5", date: "2024-03-15", amount: 180 },
      { id: 2, customer: "Jane Smith", car: "Audi A4", date: "2024-03-14", amount: 150 },
      { id: 3, customer: "Mike Johnson", car: "Mercedes C-Class", date: "2024-03-13", amount: 200 },
      { id: 4, customer: "Sarah Wilson", car: "Tesla Model 3", date: "2024-03-12", amount: 220 },
    ],
    popularCars: [
      { car: "BMW X5", bookings: 45 },
      { car: "Tesla Model 3", bookings: 38 },
      { car: "Mercedes C-Class", bookings: 32 },
      { car: "Audi A4", bookings: 28 },
    ]
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaChartBar className="page-icon" /> Reports & Analytics</h1>
      </div>

      <div className="reports-container">
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bookings">
              <FaCarSide />
            </div>
            <div className="stat-details">
              <h3>Total Bookings</h3>
              <p className="stat-number">{statistics.totalBookings}</p>
              <span className="stat-change positive">
                <FaArrowUp /> +12.5%
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <FaDollarSign />
            </div>
            <div className="stat-details">
              <h3>Total Revenue</h3>
              <p className="stat-number">€{statistics.totalRevenue}</p>
              <span className="stat-change positive">
                <FaArrowUp /> +8.3%
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon vehicles">
              <FaCarSide />
            </div>
            <div className="stat-details">
              <h3>Active Vehicles</h3>
              <p className="stat-number">{statistics.activeVehicles}</p>
              <span className="stat-change negative">
                <FaArrowDown /> -2.1%
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon customers">
              <FaUsers />
            </div>
            <div className="stat-details">
              <h3>Total Customers</h3>
              <p className="stat-number">{statistics.totalCustomers}</p>
              <span className="stat-change positive">
                <FaArrowUp /> +5.7%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="report-section">
          <h2>Recent Bookings</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {statistics.recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.customer}</td>
                    <td>{booking.car}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>€{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Cars */}
        <div className="report-section">
          <h2>Most Popular Vehicles</h2>
          <div className="popular-cars">
            {statistics.popularCars.map((car, index) => (
              <div key={index} className="popular-car-item">
                <div className="car-info">
                  <h4>{car.car}</h4>
                  <p>{car.bookings} bookings</p>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(car.bookings / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
