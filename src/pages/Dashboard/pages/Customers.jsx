import React, { useState, useEffect } from 'react';
import { FaUsers, FaSearch, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";
import AddUsersForm from '../components/AddUsersForm';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !user.token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3011/getUsers", {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return 'Admin';
      case 2:
        return 'Staff';
      case 3:
        return 'Customer';
      default:
        return 'User';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleUserAdded = () => {
    fetchUsers();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaUsers className="page-icon" /> Users</h1>
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search customers..." />
          </div>
          <button className="add-btn" onClick={() => setIsAddUserOpen(true)}>
            <FaPlus /> Add Customer
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>#{user.id.toString().padStart(4, '0')}</td>
                <td>{user.username}</td>
                <td>{user.phone_number}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role role-${user.role_id}`}>
                    {getRoleName(user.role_id)}
                  </span>
                </td>
                <td>{formatDate(user.created_at)}</td>
                <td className="actions">
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUsersForm 
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSuccess={handleUserAdded}
      />
    </div>
  );
};

export default Customers; 