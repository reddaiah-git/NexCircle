import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './profileStyles.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError({ message: 'No authentication token found.' });
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await API.get('/users/me', config);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
        console.error('Error fetching profile:', err.response ? err.response.data : err.message);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-container">Error: {error.message}</div>;
  }

  if (!user) {
    return <div className="profile-container">No user data found.</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* Events Attending and Organized will need separate API calls or be included in user data */}
      <div className="profile-section">
        <h3>Events Attending</h3>
        <p>Feature to be implemented: Display events the user is attending.</p>
      </div>

      <div className="profile-section">
        <h3>Events Organized</h3>
        <p>Feature to be implemented: Display events the user has organized.</p>
      </div>

      <button className="edit-profile-button">Edit Profile</button>
    </div>
  );
};

export default Profile;