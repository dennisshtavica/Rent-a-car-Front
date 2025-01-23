import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import "../scss/_pages.scss";

const Staff = () => {
  // Sample staff data
  const staffMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      email: "john@example.com",
      phone: "+1234567890",
      image: "https://i.kym-cdn.com/entries/icons/original/000/031/003/cover3.jpg" // Surprised Pikachu
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Sales Representative",
      email: "jane@example.com",
      phone: "+0987654321",
      image: "https://i.kym-cdn.com/entries/icons/original/000/026/489/crying.jpg" // Crying Cat
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Customer Service",
      email: "mike@example.com",
      phone: "+1122334455",
      image: "https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg" // Trollface
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaUserTie className="page-icon" /> Our Staff</h1>
      </div>

      <div className="staff-grid">
        {staffMembers.map((staff) => (
          <div key={staff.id} className="staff-card">
            <div className="staff-image">
              <img 
                src={staff.image} 
                alt={staff.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png'
                }}
              />
            </div>
            <div className="staff-info">
              <h3>{staff.name}</h3>
              <p className="position">{staff.position}</p>
              <div className="contact-info">
                <p>{staff.email}</p>
                <p>{staff.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
