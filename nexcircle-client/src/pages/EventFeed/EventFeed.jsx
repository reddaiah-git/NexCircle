import React, { useState, useEffect } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import MapView from '../../components/MapView/MapView';
import API from '../../services/api';
import './eventFeedStyles.css';

const EventFeed = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error.response ? error.response.data : error.message);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag ? event.tags.includes(filterTag) : true;
    const matchesDate = filterDate ? new Date(event.date).toISOString().slice(0, 10) === filterDate : true;
    return matchesSearch && matchesTag && matchesDate;
  });

  return (
    <div className="event-feed-page">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
          <option value="">All Tags</option>
          <option value="music">Music</option>
          <option value="gardening">Gardening</option>
          <option value="tech">Tech</option>
          <option value="food">Food</option>
          <option value="art">Art</option>
          <option value="wellness">Wellness</option>
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      <div className="event-feed-content">
        <div className="event-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p>No events found matching your criteria.</p>
          )}
        </div>
        <div className="map-view-section">
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default EventFeed;