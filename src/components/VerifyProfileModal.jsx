import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import '../scss/components/_verifyProfileModal.scss';
const VerifyProfileModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    license_number: '',
    expiration_date: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const getStoredUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };
  useEffect(() => {
    checkVerificationStatus();
  }, []);
  const checkVerificationStatus = async () => {
    try {
      const user = getStoredUser();
      const token = user?.token;
      if (!user || !token) {
        throw new Error('Authentication data missing');
      }
      const response = await axios.get(
        'http://localhost:3011/driver-verification/status',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.data.verification) {
        setVerificationStatus(response.data.verification);
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error checking verification status:', error);
        setError(error.response?.data?.message || 'Error checking verification status');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setValidationErrors({});

    const errors = {};
    if (!formData.license_number.trim()) {
      errors.license_number = 'License number is required';
    }
    if (!formData.expiration_date) {
      errors.expiration_date = 'Expiration date is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const user = getStoredUser();
      const token = user?.token;
      if (!user || !token) {
        throw new Error('Authentication data missing');
      }
      const response = await axios.post(
        'http://localhost:3011/driver-verification/submit',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const updatedUser = { ...user, is_verified: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccess('Verification submitted successfully!');
      await checkVerificationStatus();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting verification:', error);
      setError(error.response?.data?.message || 'Failed to submit verification');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  if (loading) {
    return (
      <div className="verify-modal-overlay">
        <div className="verify-modal">
          <div className="loading-container">
            <PulseLoader color="#8C8BBF" size={10} />
          </div>
        </div>
      </div>
    );
  }
  if (verificationStatus) {
    return (
      <div className="verify-modal-overlay">
        <div className="verify-modal">
          <h2>Verification Status</h2>
          <div className="verification-status">
            <p>Status: <span className={`status ${verificationStatus.is_verified ? 'verified' : 'pending'}`}>
              {verificationStatus.is_verified ? 'Verified' : 'Pending'}
            </span></p>
            <p>License Number: {verificationStatus.license_number}</p>
            <p>Expiration Date: {new Date(verificationStatus.expiration_date).toLocaleDateString()}</p>
          </div>
          <div className="button-group">
            <button onClick={onClose} className="cancel-btn">Close</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="verify-modal-overlay">
      <div className="verify-modal">
        <h2>Driver License Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>License Number</label>
            <input
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              required
            />
            {validationErrors.license_number && (
              <div className="error-message">{validationErrors.license_number}</div>
            )}
          </div>
          <div className="form-group">
            <label>Expiration Date (MM/DD/YYYY)</label>
            <input
              type="date"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleChange}
              required
            />
            {validationErrors.expiration_date && (
              <div className="error-message">{validationErrors.expiration_date}</div>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <PulseLoader color="#ffffff" size={8} /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default VerifyProfileModal;