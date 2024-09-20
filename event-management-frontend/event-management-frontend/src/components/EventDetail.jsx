import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard');
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-detail-container">
      <h1>Event Details</h1>
      <div className="event-detail">
        <h2>{event.title}</h2>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <button onClick={handleBackToDashboard} className="btn btn-secondary mt-3">Back to Dashboard</button>
      </div>
    </div>
  );
};

export default EventDetail;
