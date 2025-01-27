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
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Rentals',
        data: [],
        borderColor: '#2563eb',
        tension: 0.4,
      },
    ],
  });

  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffTime = Math.abs(now - activityDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !user.token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          return;
        }

        const [carsResponse, usersResponse, bookingsResponse] = await Promise.all([
          axios.get("http://localhost:3011/getCars", {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            }
          }),
          axios.get("http://localhost:3011/getUsers", {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            }
          }),
          axios.get("http://localhost:3011/allBookings", {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        const revenue = bookingsResponse.data.reduce((sum, booking) => {
          const startDate = new Date(booking.rentalDate.from);
          const endDate = new Date(booking.rentalDate.to);
          const diffTime = Math.abs(endDate - startDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const bookingTotal = diffDays * booking.car.price;
          return sum + bookingTotal;
        }, 0);

        const sortedBookings = [...bookingsResponse.data].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );

        const recentActivities = sortedBookings.slice(0, 3).map(booking => ({
          id: booking._id,
          type: 'booking',
          time: booking.createdAt,
          message: `New booking: ${booking.car.brand} ${booking.car.model} by ${booking.user?.username || 'Unknown User'}`,
          status: booking.booking_status
        }));

        const processChartData = (bookings) => {
          const currentDate = new Date();
          const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
          
          const bookedCars = new Set();
          
          bookings.forEach(booking => {
            const bookingDate = new Date(booking.rentalDate.from);
            if (bookingDate.getFullYear() === 2025 && 
                bookingDate.getMonth() === currentDate.getMonth()) {
              bookedCars.add(booking.car._id);
            }
          });

          return {
            labels: [`${currentMonth} 2025`],
            datasets: [
              {
                label: 'Cars Booked',
                data: [bookedCars.size],
                borderColor: '#2563eb',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                barThickness: 50
              },
            ],
          };
        };

        const newChartData = processChartData(bookingsResponse.data);
        setChartData(newChartData);

        if (carsResponse.data && Array.isArray(carsResponse.data)) {
          setTotalCars(carsResponse.data.length);
        }
        
        if (usersResponse.data && Array.isArray(usersResponse.data)) {
          setTotalUsers(usersResponse.data.length);
        }

        // Get current month bookings
        const currentDate = new Date();
        const currentMonthBookings = bookingsResponse.data.filter(booking => {
          const bookingDate = new Date(booking.rentalDate.from);
          return bookingDate.getFullYear() === 2025 && 
                 bookingDate.getMonth() === currentDate.getMonth();
        });

        setTotalBookings(currentMonthBookings.length);

        setRecentActivities(recentActivities);
        setTotalRevenue(revenue);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            return `${value} car${value !== 1 ? 's' : ''} booked`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return `${value} car${value !== 1 ? 's' : ''}`;
          }
        },
      },
    },
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
            <p>{totalUsers}</p>
          </div>
        </Link>

        <Link to="/dashboard/reports" className="stat-card">
          <div className="stat-icon">
            <FaMoneyBillWave />
          </div>
          <div className="stat-info">
            <h3>Revenue</h3>
            <p>€{totalRevenue}</p>
          </div>
        </Link>

        <Link to="/dashboard/rentals" className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>Current Month Bookings</h3>
            <p>{totalBookings}</p>
          </div>
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="chart-container">
          <h2>Cars Booked (Current Month)</h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <span className="activity-time">{formatTimeAgo(activity.time)}</span>
                <p>{activity.message}</p>
                {activity.status && (
                  <span className={`status-badge ${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </span>
                )}
              </div>
            ))}
            {recentActivities.length === 0 && (
              <div className="activity-item">
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
