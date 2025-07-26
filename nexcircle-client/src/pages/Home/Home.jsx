import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel'; // Removed
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Removed
import './homeStyles.css';

// Placeholder images for the carousel
import carouselImage1 from '../../assets/banner.jpg';

const Home = () => {
  const navigate = useNavigate();
  const featuredEvents = [
    {
      id: 1,
      title: 'Local Music Festival',
      date: 'August 15, 2025',
      location: 'Central Park',
      description: 'Enjoy a day of live music from local artists.',
    },
    {
      id: 2,
      title: 'Community Garden Workshop',
      date: 'August 20, 2025',
      location: 'Community Center',
      description: 'Learn how to start your own community garden.',
    },
    {
      id: 3,
      title: 'Tech Meetup: AI in Action',
      date: 'August 25, 2025',
      location: 'Tech Hub',
      description: 'A meetup for AI enthusiasts and professionals.',
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <h2>Welcome to NexCircle</h2>
        <p>Discover and create events near you!</p>
        <button className="call-to-action-button" onClick={() => navigate('/events')}>Explore Events</button>
      </section>

      <section className="featured-events-section">
        <h3>Featured Events</h3>
        <div className="event-list">
          {featuredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h3>About NexCircle</h3>
        <p>
          NexCircle is your ultimate community hub for discovering, creating, and connecting through local events. 
          Our mission is to foster vibrant local communities by making it easy for individuals and organizations 
          to share and find events that matter to them. From music festivals and art exhibitions to workshops 
          and volunteer opportunities, NexCircle brings people together.
        </p>
        <p>
          We believe in the power of shared experiences. Whether you're looking to explore new hobbies, 
          meet like-minded individuals, or simply find something fun to do, NexCircle is here to help you 
          make the most of your local scene. Join us today and start your journey of discovery and connection!
        </p>
      </section>
    </div>
  );
};

export default Home;
