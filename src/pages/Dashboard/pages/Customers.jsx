import React, { useState, useEffect } from 'react';
import { FaUsers, FaSearch, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";
import AddUsersForm from '../components/AddUsersForm';
import EditUsersForm from '../components/EditUsersForm';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get('http://localhost:3011/getUsers', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return 'Admin';
      case 2:
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

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`http://localhost:3011/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      await fetchUsers();
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const DeleteConfirmation = () => {
    if (!showDeleteConfirm) return null;
    
    return (
      <div className="modal-overlay-delete">
        <div className="modal-content-delete">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this user? This action cannot be undone.</p>
          <div className="delete-form-actions">
            <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
              Cancel
            </button>
            <button 
              onClick={() => handleDelete(selectedUser.id)} 
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
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
                  <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                  <button 
                    className="delete" 
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUsersForm 
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSuccess={() => {
          fetchUsers();
          setIsAddUserOpen(false);
        }}
      />

      <EditUsersForm 
        isOpen={isEditUserOpen}
        onClose={() => setIsEditUserOpen(false)}
        user={selectedUser}
        onSuccess={() => {
          fetchUsers();
          setIsEditUserOpen(false);
        }}
      />

      <DeleteConfirmation />
    </div>
  );
};

export default Customers; 