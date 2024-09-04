// src/components/ViewEvent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewEvent.css';

const ViewEvent = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-event-container">
      <h1>{event.title}</h1>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}</p>
      <p><strong>Category:</strong> {event.category}</p>
    </div>
  );
};

export default ViewEvent;
