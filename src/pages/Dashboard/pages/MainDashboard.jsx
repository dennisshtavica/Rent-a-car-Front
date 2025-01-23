import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaCar, 
  FaUsers, 
  FaMoneyBillWave, 
  FaCalendarAlt 
} from 'react-icons/fa';
import "../scss/_mainDashboard.scss";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainDashboard = () => {
  const [totalCars, setTotalCars] = useState(0);
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
          setTotalCars(response.data.length);
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

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Rentals',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#2563eb',
        tension: 0.4,
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>
      
      <div className="stats-grid">
        <Link to="/dashboard/vehicles" className="stat-card">
          <div className="stat-icon">
            <FaCar />
          </div>
          <div className="stat-info">
            <h3>Total Cars</h3>
            <p>{totalCars}</p>
          </div>
        </Link>

        <Link to="/dashboard/customers" className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>Active Customers</h3>
            <p>847</p>
          </div>
        </Link>

        <Link to="/dashboard/reports" className="stat-card">
          <div className="stat-icon">
            <FaMoneyBillWave />
          </div>
          <div className="stat-info">
            <h3>Revenue</h3>
            <p>$52,847</p>
          </div>
        </Link>

        <Link to="/dashboard/rentals" className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>Bookings</h3>
            <p>38</p>
          </div>
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="chart-container">
          <h2>Rental Statistics</h2>
          <Line data={chartData} />
        </div>

        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">2h ago</span>
              <p>New booking: BMW X5 by John Doe</p>
            </div>
            <div className="activity-item">
              <span className="activity-time">5h ago</span>
              <p>Return completed: Mercedes C-Class</p>
            </div>
            <div className="activity-item">
              <span className="activity-time">1d ago</span>
              <p>New customer registration: Sarah Smith</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
