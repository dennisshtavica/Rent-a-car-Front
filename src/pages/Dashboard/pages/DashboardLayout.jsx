import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaKey, 
  FaCar, 
  FaUsers, 
  FaClipboardList,
  FaCarCrash,
  FaChartBar,
  FaUserTie,
  FaStar,
  FaSignOutAlt 
} from 'react-icons/fa';
import "../scss/_mainDashboard.scss";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>CarRent Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/dashboard" end>
                <FaTachometerAlt />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/rentals">
                <FaKey />
                <span>Rentals</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/vehicles">
                <FaCar />
                <span>Vehicles</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/customers">
                <FaUsers />
                <span>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reservations">
                <FaClipboardList />
                <span>Reservations</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/maintenance">
                <FaCarCrash />
                <span>Maintenance</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reports">
                <FaChartBar />
                <span>Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/staff">
                <FaUserTie />
                <span>Staff</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/settings">
                <FaStar />
                <span>Reviews</span>
              </NavLink>
            </li>
            <li className="logout">
              <button onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
