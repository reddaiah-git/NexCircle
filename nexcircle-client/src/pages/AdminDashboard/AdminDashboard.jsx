import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './adminDashboardStyles.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError({ message: 'No authentication token found. Please log in as an admin.' });
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const usersResponse = await API.get('/admin/users', config);
      setUsers(usersResponse.data);

      const eventsResponse = await API.get('/events', config); // Assuming admin can see all events
      setEvents(eventsResponse.data);

      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      setLoading(false);
      console.error('Error fetching admin data:', err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await API.delete(`/admin/users/${userId}`, config);
        alert(`User ${userId} deleted.`);
        fetchAdminData(); // Refresh data
      } catch (err) {
        console.error('Error deleting user:', err.response ? err.response.data : err.message);
        alert(err.response ? err.response.data.message : 'Failed to delete user.');
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm(`Are you sure you want to delete event with ID: ${eventId}?`)) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await API.delete(`/admin/events/${eventId}`, config);
        alert(`Event ${eventId} deleted.`);
        fetchAdminData(); // Refresh data
      } catch (err) {
        console.error('Error deleting event:', err.response ? err.response.data : err.message);
        alert(err.response ? err.response.data.message : 'Failed to delete event.');
      }
    }
  };

  if (loading) {
    return <div className="admin-dashboard-container">Loading admin data...</div>;
  }

  if (error) {
    return <div className="admin-dashboard-container">Error: {error.message}</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      <section className="admin-section">
        <h3>Manage Users</h3>
        {users.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </section>

      <section className="admin-section">
        <h3>Manage Events</h3>
        {events.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Organizer</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.title}</td>
                  <td>{event.organizerUser ? event.organizerUser.username : 'Unknown'}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDeleteEvent(event.id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events found.</p>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;