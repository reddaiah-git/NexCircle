import React from 'react';
import { Link } from 'react-router-dom';
import './eventCardStyles.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>
      <Link to={`/event/${event.id}`} className="view-details-button">View Details</Link>
    </div>
  );
};

export default EventCard;
