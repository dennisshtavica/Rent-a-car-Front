import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import '../scss/_userForm.scss'
const AddUsersForm = ({ isOpen, onClose, onSuccess }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    role_id: ''
  });

  const handleChange = (e) => {
    const value = e.target.name === 'role_id' ? 
      parseInt(e.target.value, 10) :
      e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      const response = await axios.post("http://localhost:3011/users/create", formData, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      
      setFormData({
        username: '',
        email: '',
        password: '',
        phone_number: '',
        role_id: ''
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.response?.data?.message || 'An error occurred while creating the user');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New User</h2>
          <button onClick={onClose} className="close-btn">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="animated-form">
         {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <div className="form-group slide-in">
           <label htmlFor="username">Username</label>
           <input
             type="text"
             id="username"
             name="username"
             value={formData.username}
             onChange={handleChange}
             required
             className="form-input"
           />
         </div>
          <div className="form-group slide-in">
           <label htmlFor="email">Email</label>
           <input
             type="email"
             id="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             required
             className="form-input"
           />
         </div>
          <div className="form-group slide-in">
           <label htmlFor="password">Password</label>
           <input
             type="password"
             id="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             required
             className="form-input"
           />
         </div>
          <div className="form-group slide-in">
           <label htmlFor="phone_number">Phone Number</label>
           <input
             type="tel"
             id="phone_number"
             name="phone_number"
             value={formData.phone_number}
             onChange={handleChange}
             required
             className="form-input"
           />
         </div>
          <div className="form-group slide-in">
           <label htmlFor="role_id">Role</label>
           <select
             id="role_id"
             name="role_id"
             value={formData.role_id}
             onChange={handleChange}
             required
             className="form-select"
           >
             <option value="">Select a role</option>
             <option value="1">Admin</option>
             <option value="2">User</option>
           </select>
         </div>
          <div className="form-actions fade-in">
           <button type="button" onClick={onClose} className="btn-secondary">
             Cancel
           </button>
           <button type="submit" className="btn-primary">
             Add User
           </button>
         </div>
       </form>
      </div>
    </div>
  );
};

export default AddUsersForm;
