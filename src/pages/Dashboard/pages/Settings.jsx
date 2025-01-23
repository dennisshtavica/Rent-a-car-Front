import React from 'react';
import { FaCog, FaUser, FaBell, FaLock, FaPalette } from 'react-icons/fa';
import "../scss/_pages.scss";

const Settings = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaCog className="page-icon" /> Settings</h1>
      </div>

      <div className="settings-container">
        {/* Profile Settings */}
        <div className="settings-section">
          <div className="settings-header">
            <FaUser className="section-icon" />
            <h2>Profile Settings</h2>
          </div>
          <div className="settings-content">
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Current username" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Current email" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Current phone number" />
            </div>
            <button className="btn-primary">Update Profile</button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section">
          <div className="settings-header">
            <FaLock className="section-icon" />
            <h2>Security</h2>
          </div>
          <div className="settings-content">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
            <button className="btn-primary">Change Password</button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <div className="settings-header">
            <FaBell className="section-icon" />
            <h2>Notifications</h2>
          </div>
          <div className="settings-content">
            <div className="toggle-group">
              <label>
                <input type="checkbox" />
                Email Notifications
              </label>
            </div>
            <div className="toggle-group">
              <label>
                <input type="checkbox" />
                SMS Notifications
              </label>
            </div>
            <div className="toggle-group">
              <label>
                <input type="checkbox" />
                Browser Notifications
              </label>
            </div>
            <button className="btn-primary">Save Preferences</button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="settings-section">
          <div className="settings-header">
            <FaPalette className="section-icon" />
            <h2>Appearance</h2>
          </div>
          <div className="settings-content">
            <div className="theme-options">
              <div className="theme-option">
                <input type="radio" id="light" name="theme" value="light" />
                <label htmlFor="light">Light Mode</label>
              </div>
              <div className="theme-option">
                <input type="radio" id="dark" name="theme" value="dark" />
                <label htmlFor="dark">Dark Mode</label>
              </div>
              <div className="theme-option">
                <input type="radio" id="system" name="theme" value="system" />
                <label htmlFor="system">System Default</label>
              </div>
            </div>
            <button className="btn-primary">Apply Theme</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
