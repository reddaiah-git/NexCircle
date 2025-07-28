import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../../services/api';
import './createEventStyles.css';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to create an event.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await API.post('/events', {
        title,
        description,
        date,
        location,
      }, config);
      console.log('Event created:', response.data);
      alert('Event created successfully!');
      // Clear form
      setTitle('');
      setDescription('');
      setDate(new Date());
      setLocation('');
    } catch (error) {
      console.error('Error creating event:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : 'Failed to create event.');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="Pp" showTimeSelect required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="create-event-button">CREATE EVENT</button>
      </form>
    </div>
  );
};

export default CreateEvent;