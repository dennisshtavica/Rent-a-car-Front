import React, { useState, useEffect } from 'react';
import { FaTools, FaCarAlt, FaCalendarAlt, FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";

const MaintenanceModal = ({ isOpen, onClose, carId, onSuccess }) => {
  const [formData, setFormData] = useState({
    service_date: new Date().toISOString().split('T')[0],
    service_type: '',
    mileage: '',
    mechanic: '',
    issues_found: [''],
    fixed: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      console.log('Submitting maintenance data:', {
        car_id: carId,
        ...formData
      });
      
      const response = await axios.post(
        `http://localhost:3011/maintenance/add`,
        {
          car_id: carId,
          ...formData,
          issues_found: formData.issues_found.filter(issue => issue.trim() !== '')
        },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.success) {
        console.log('Maintenance record added:', response.data.data);
        onSuccess();
        onClose();
      } else {
        throw new Error(response.data.message || 'Failed to add maintenance record');
      }
    } catch (error) {
      console.error('Error adding maintenance record:', error.response?.data || error.message);
      alert('Failed to add maintenance record. Please try again.');
    }
  };

  const addIssue = () => {
    setFormData(prev => ({
      ...prev,
      issues_found: [...prev.issues_found, '']
    }));
  };

  const removeIssue = (index) => {
    setFormData(prev => ({
      ...prev,
      issues_found: prev.issues_found.filter((_, i) => i !== index)
    }));
  };

  const updateIssue = (index, value) => {
    setFormData(prev => ({
      ...prev,
      issues_found: prev.issues_found.map((issue, i) => i === index ? value : issue)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="maintenance-modal-overlay">
      <div className="maintenance-modal-content">
        <div className="maintenance-modal-header">
          <h2>Add Service Record</h2>
          <button onClick={onClose} className="maintenance-close-button">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="maintenance-form-group">
            <label>Service Date</label>
            <input
              type="date"
              value={formData.service_date}
              onChange={e => setFormData(prev => ({ ...prev, service_date: e.target.value }))}
              required
            />
          </div>
          <div className="maintenance-form-group">
            <label>Service Type</label>
            <select
              value={formData.service_type}
              onChange={e => setFormData(prev => ({ ...prev, service_type: e.target.value }))}
              required
            >
              <option value="">Select service type</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Tire Rotation">Tire Rotation</option>
              <option value="Brake Service">Brake Service</option>
              <option value="General Maintenance">General Maintenance</option>
              <option value="Repair">Repair</option>
            </select>
          </div>
          <div className="maintenance-form-group">
            <label>Current Mileage (km)</label>
            <input
              type="number"
              value={formData.mileage}
              onChange={e => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
              required
            />
          </div>
          <div className="maintenance-form-group">
            <label>Mechanic</label>
            <select
              value={formData.mechanic}
              onChange={e => setFormData(prev => ({ ...prev, mechanic: e.target.value }))}
              required
            >
              <option value="">Select mechanic</option>
              <option value="Tom Mechanic">Tom Mechanic</option>
              <option value="Speedy Repairs">Speedy Repairs</option>
              <option value="Auto Pro Services">Auto Pro Services</option>
              <option value="Master Mechanics">Master Mechanics</option>
            </select>
          </div>
          <div className="maintenance-form-group">
            <label>Issues Found</label>
            {formData.issues_found.map((issue, index) => (
              <div key={index} className="maintenance-issue-input">
                <input
                  type="text"
                  value={issue}
                  onChange={e => updateIssue(index, e.target.value)}
                  placeholder="Describe the issue"
                />
                <button
                  type="button"
                  onClick={() => removeIssue(index)}
                  className="maintenance-remove-issue"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button type="button" onClick={addIssue} className="maintenance-add-issue">
              + Add Another Issue
            </button>
          </div>
          <div className="maintenance-form-group">
            <label className="maintenance-checkbox-label">
              <input
                type="checkbox"
                checked={formData.fixed}
                onChange={e => setFormData(prev => ({ ...prev, fixed: e.target.checked }))}
              />
              Issues Fixed
            </label>
          </div>
          <div className="maintenance-modal-actions">
            <button type="submit" className="maintenance-btn-primary">Save Record</button>
            <button type="button" onClick={onClose} className="maintenance-btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Maintenance = () => {
 const [cars, setCars] = useState([]);
 const [maintenanceData, setMaintenanceData] = useState({});
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [selectedCarId, setSelectedCarId] = useState(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
   const fetchData = async () => {
     try {
       const user = JSON.parse(localStorage.getItem("user"));
       
       const carsResponse = await axios.get("http://localhost:3011/getCars", {
         headers: {
           'Authorization': `Bearer ${user.token}`
         }
       });
       
       setCars(carsResponse.data);
       
       const maintenanceByCar = {};
       await Promise.all(carsResponse.data.map(async (car) => {
         try {
           
           const maintenanceResponse = await axios.get(
             `http://localhost:3011/maintenance/${car._id}`,
             {
               headers: {
                 'Authorization': `Bearer ${user.token}`
               }
             }
           );
           
           
           if (maintenanceResponse.data && maintenanceResponse.data.success) {
             maintenanceByCar[car._id] = maintenanceResponse.data.data;
           } else {
             maintenanceByCar[car._id] = [];
           }
         } catch (err) {
           console.error(`Error fetching maintenance for car ${car._id}:`, err.response?.data || err.message);
           maintenanceByCar[car._id] = [];
         }
       }));

       setMaintenanceData(maintenanceByCar);
     } catch (err) {
       const errorMessage = err.response?.data?.message || err.message;
       setError(`Failed to fetch data: ${errorMessage}`);
       console.error("Error details:", {
         message: err.message,
         response: err.response?.data,
         status: err.response?.status
       });
     } finally {
       setLoading(false);
     }
   };
    fetchData();
 }, []);
  const getMaintenanceInfo = (carId) => {
   const carRecords = maintenanceData[carId];
   
   if (!carRecords || !Array.isArray(carRecords) || carRecords.length === 0) {
     return {
       lastService: "No service record",
       nextService: "Not scheduled",
       status: "No Data",
       mileage: 0,
       serviceType: "No service",
       issues: [],
       allServices: []
     };
   }

   const sortedRecords = [...carRecords].sort((a, b) => 
     new Date(b.service_date) - new Date(a.service_date)
   );
   
   const latestService = sortedRecords[0];
   
   const nextServiceDate = new Date(latestService.service_date);
   nextServiceDate.setMonth(nextServiceDate.getMonth() + 3);
   const today = new Date();
   let status = "Up to date";
   if (nextServiceDate < today) {
     status = "Maintenance Required";
   } else if (nextServiceDate - today < 1000 * 60 * 60 * 24 * 30) { 
     status = "Service Due Soon";
   }
    return {
     lastService: latestService.service_date,
     nextService: nextServiceDate,
     status: status,
     mileage: latestService.mileage || 0,
     serviceType: latestService.service_type || "Unknown",
     issues: latestService.issues_found || [],
     mechanic: latestService.mechanic || "Unknown",
     fixed: latestService.fixed || false,
     allServices: sortedRecords 
   };
 };
  const formatDate = (dateString) => {
   return new Date(dateString).toLocaleDateString('en-US', {
     year: 'numeric',
     month: 'short',
     day: 'numeric'
   });
 };
  const handleAddService = (carId) => {
    setSelectedCarId(carId);
    setIsModalOpen(true);
  };

  const handleModalSuccess = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const maintenanceResponse = await axios.get(
        `http://localhost:3011/maintenance/${selectedCarId}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
      );
      
      if (maintenanceResponse.data && maintenanceResponse.data.success) {
        setMaintenanceData(prev => ({
          ...prev,
          [selectedCarId]: maintenanceResponse.data.data
        }));
      }
    } catch (error) {
      console.error('Error refreshing maintenance data:', error.response?.data || error.message);
    }
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
         {cars.map((car) => {
           const maintenanceInfo = getMaintenanceInfo(car._id);
           return (
             <div key={car._id} className="maintenance-card">
               <div className="card-header">
                 <div className="vehicle-info">
                   <img 
                     src={`http://localhost:3011/${car.image}`}
                     alt={`${car.brand} ${car.model}`}
                     className="vehicle-image"
                     onError={(e) => {
                       e.target.onerror = null;
                       e.target.src = 'placeholder-image-url';
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
                  <div className="service-details">
                     <h4>Latest Service Details</h4>
                     <div className="service-info-grid">
                       <div className="service-info-item">
                         <label>Type:</label>
                         <p>{maintenanceInfo.serviceType}</p>
                       </div>
                       <div className="service-info-item">
                         <label>Mechanic:</label>
                         <p>{maintenanceInfo.mechanic}</p>
                       </div>
                       <div className="service-info-item">
                         <label>Status:</label>
                         <p>{maintenanceInfo.fixed ? 'Fixed' : 'Pending'}</p>
                       </div>
                     </div>
                      <div className="issues-section">
                        <h4>Issues Found</h4>
                        {maintenanceInfo.issues.length > 0 ? (
                          <ul className="issues-list">
                            {maintenanceInfo.issues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="no-issues">No issues found</p>
                        )}
                      </div>
                      <div className="service-history">
                       <h4>Service History</h4>
                       <ul className="history-list">
                         {maintenanceInfo.allServices.map((service, index) => (
                           <li key={index}>
                             {formatDate(service.service_date)} - {service.service_type}
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                 <div className="card-actions">
                   <button 
                     className="btn-primary"
                     onClick={() => handleAddService(car._id)}
                   >
                     Add Service Record
                   </button>
                   <button className="btn-secondary">View Full History</button>
                 </div>
               </div>
             </div>
           );
         })}
       </div>
     </div>
     
     <MaintenanceModal
       isOpen={isModalOpen}
       onClose={() => setIsModalOpen(false)}
       carId={selectedCarId}
       onSuccess={handleModalSuccess}
     />
   </div>
 );
};
export default Maintenance;