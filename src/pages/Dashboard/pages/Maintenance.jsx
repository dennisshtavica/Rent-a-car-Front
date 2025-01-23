import React, { useState, useEffect } from 'react';
import { FaTools, FaCarAlt, FaCalendarAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";

const Maintenance = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:3011/getCars", {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        // Only take the first 6 cars
        setCars(response.data.slice(0, 6));
      } catch (err) {
        setError("Failed to fetch cars");
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Different maintenance info for each car
  const maintenanceInfos = {
    1: {
      lastService: "2024-02-15",
      nextService: "2024-05-15",
      status: "Up to date",
      mileage: 45000,
      tasks: ["Oil Change", "Brake Check", "Tire Rotation"]
    },
    2: {
      lastService: "2024-01-20",
      nextService: "2024-04-20",
      status: "Service Due Soon",
      mileage: 62000,
      tasks: ["Air Filter", "Battery Check", "Fluid Levels"]
    },
    3: {
      lastService: "2023-12-10",
      nextService: "2024-03-10",
      status: "Maintenance Required",
      mileage: 38000,
      tasks: ["Full Service", "Brake Fluid", "Alignment"]
    },
    4: {
      lastService: "2024-02-01",
      nextService: "2024-05-01",
      status: "Up to date",
      mileage: 28000,
      tasks: ["Oil Change", "Filters", "Tire Pressure"]
    },
    5: {
      lastService: "2024-01-05",
      nextService: "2024-04-05",
      status: "Service Due Soon",
      mileage: 55000,
      tasks: ["Transmission Check", "Brake Pads", "Coolant"]
    },
    6: {
      lastService: "2023-11-30",
      nextService: "2024-02-28",
      status: "Maintenance Required",
      mileage: 72000,
      tasks: ["Major Service", "Timing Belt", "Suspension"]
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaTools className="page-icon" /> Vehicle Maintenance</h1>
      </div>

      <div className="maintenance-container">
        <div className="maintenance-grid">
          {cars.map((car, index) => {
            const maintenanceInfo = maintenanceInfos[index + 1] || maintenanceInfos[1];
            return (
              <div key={car.id} className="maintenance-card">
                <div className="card-header">
                  <div className="vehicle-info">
                    <img 
                      src={`http://localhost:3011/${car.image}`}
                      alt={`${car.brand} ${car.model}`}
                      className="vehicle-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'placeholder-image-url'; // Add a placeholder image URL
                      }}
                    />
                    <div>
                      <h3>{car.brand} {car.model}</h3>
                      <p className="plate-number">{car.plate_number || 'No plate'}</p>
                    </div>
                  </div>
                  <div className={`status-badge ${maintenanceInfo.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {maintenanceInfo.status === "Up to date" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationCircle />
                    )}
                    {maintenanceInfo.status}
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Last Service</label>
                      <p><FaCalendarAlt /> {formatDate(maintenanceInfo.lastService)}</p>
                    </div>
                    <div className="info-item">
                      <label>Next Service</label>
                      <p><FaCalendarAlt /> {formatDate(maintenanceInfo.nextService)}</p>
                    </div>
                    <div className="info-item">
                      <label>Current Mileage</label>
                      <p>{maintenanceInfo.mileage.toLocaleString()} km</p>
                    </div>
                  </div>

                  <div className="maintenance-tasks">
                    <label>Maintenance Tasks</label>
                    <ul>
                      {maintenanceInfo.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-actions">
                    <button className="btn-primary">Update Service</button>
                    <button className="btn-secondary">View History</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
