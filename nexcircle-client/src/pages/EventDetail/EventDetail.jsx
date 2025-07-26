import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MapView from '../../components/MapView/MapView';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import API from '../../services/api';
import './eventDetailStyles.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await API.get(`/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error('Error fetching event details:', err.response ? err.response.data : err.message);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRSVP = () => {
    setIsRSVPed(!isRSVPed);
    alert(isRSVPed ? 'RSVP cancelled!' : 'RSVP confirmed!');
    // In a real app, you'd send an API request to update RSVP status
  };

  if (loading) {
    return <div className="event-detail-container">Loading event...</div>;
  }

  if (error) {
    return <div className="event-detail-container">Error: {error.message}</div>;
  }

  if (!event) {
    return <div className="event-detail-container">Event not found.</div>;
  }

  return (
    <div className="event-detail-page">
      <div className="event-header">
        <img src={event.imageUrl || 'https://via.placeholder.com/800x400?text=No+Image'} alt={event.title} className="event-image" />
        <h1>{event.title}</h1>
        <p className="event-host">Hosted by: {event.organizerUser ? event.organizerUser.username : 'Unknown'}</p>
      </div>

      <div className="event-info">
        <div className="info-section">
          <h3>Description</h3>
          <p>{event.description}</p>
        </div>

        <div className="info-section">
          <h3>Details</h3>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(event.date).toLocaleTimeString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          {/* <p><strong>Attendees:</strong> {event.attendees}</p> */}
          {/* <p><strong>Tags:</strong> {event.tags.join(', ')}</p> */}
        </div>

        <button onClick={handleRSVP} className={`rsvp-button ${isRSVPed ? 'rsvp-cancel' : ''}`}>
          {isRSVPed ? 'Cancel RSVP' : 'RSVP Now'}
        </button>
      </div>

      <div className="event-map-chat">
        <div className="map-section">
          <h3>Event Location</h3>
          <MapView />
        </div>
        <div className="chat-section">
          <h3>Event Chat</h3>
          <ChatWidget />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;