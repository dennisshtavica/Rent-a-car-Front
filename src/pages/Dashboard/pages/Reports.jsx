import React, { useState, useEffect } from 'react';
import { FaChartBar, FaCarSide, FaUsers, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";

const Reports = () => {
  const [statistics, setStatistics] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeVehicles: 0,
    totalCustomers: 0,
    recentBookings: [],
    popularCars: []
  });

  const [previousStats, setPreviousStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeVehicles: 0,
    totalCustomers: 0
  });

  const [percentageChanges, setPercentageChanges] = useState({
    bookings: 0,
    revenue: 0,
    vehicles: 0,
    customers: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        const user = JSON.parse(userStr || '{}');
        const token = user.token;

        if (!token) {
          throw new Error('Authentication token missing');
        }

        const [bookingsResponse, carsResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:3011/allBookings', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('http://localhost:3011/getCars', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('http://localhost:3011/getUsers', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const currentBookings = bookingsResponse.data.length;
        const currentVehicles = carsResponse.data.length;
        const currentCustomers = usersResponse.data.length;
        
        const currentRevenue = bookingsResponse.data.reduce((sum, booking) => {
          const startDate = new Date(booking.rentalDate.from);
          const endDate = new Date(booking.rentalDate.to);
          const diffTime = Math.abs(endDate - startDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const bookingTotal = diffDays * booking.car.price;
          return sum + bookingTotal;
        }, 0);

        const oldStats = {
          totalBookings: statistics.totalBookings,
          totalRevenue: statistics.totalRevenue,
          activeVehicles: statistics.activeVehicles,
          totalCustomers: statistics.totalCustomers
        };

        const calculateExactPercentageChange = (current, previous) => {
          const difference = current - previous;
          const percentageChange = (difference / previous) * 100;
          return isFinite(percentageChange) ? percentageChange : 0;
        };

        const changes = {
          bookings: calculateExactPercentageChange(currentBookings, oldStats.totalBookings),
          revenue: calculateExactPercentageChange(currentRevenue, oldStats.totalRevenue),
          vehicles: calculateExactPercentageChange(currentVehicles, oldStats.activeVehicles),
          customers: calculateExactPercentageChange(currentCustomers, oldStats.totalCustomers)
        };



        const carBookingCounts = bookingsResponse.data.reduce((acc, booking) => {
          const carId = booking.car._id;
          acc[carId] = acc[carId] || {
            car: `${booking.car.brand} ${booking.car.model}`,
            bookings: 0
          };
          acc[carId].bookings += 1;
          return acc;
        }, {});

        const popularCars = Object.values(carBookingCounts)
          .filter(car => car.bookings > 3)
          .sort((a, b) => b.bookings - a.bookings);

        setPreviousStats(oldStats);
        setPercentageChanges(changes);
        setStatistics({
          totalBookings: currentBookings,
          totalRevenue: currentRevenue,
          activeVehicles: currentVehicles,
          totalCustomers: currentCustomers,
          recentBookings: bookingsResponse.data.slice(0, 4).map(booking => ({
            id: booking._id,
            customer: booking.user?.username || 'Unknown Customer',
            car: `${booking.car.brand} ${booking.car.model}`,
            date: booking.rentalDate.from,
            amount: booking.car.price
          })),
          popularCars: popularCars
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaChartBar className="page-icon" /> Reports & Analytics</h1>
      </div>

      <div className="reports-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bookings">
              <FaCarSide />
            </div>
            <div className="stat-details">
              <h3>Total Bookings</h3>
              <p className="stat-number">{statistics.totalBookings}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <FaDollarSign />
            </div>
            <div className="stat-details">
              <h3>Total Revenue</h3>
              <p className="stat-number">€{statistics.totalRevenue}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon vehicles">
              <FaCarSide />
            </div>
            <div className="stat-details">
              <h3>Active Vehicles</h3>
              <p className="stat-number">{statistics.activeVehicles}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon customers">
              <FaUsers />
            </div>
            <div className="stat-details">
              <h3>Total Customers</h3>
              <p className="stat-number">{statistics.totalCustomers}</p>
            </div>
          </div>
        </div>

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
