import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/events/${id}`)
      .then(() => setEvents(events.filter(event => event.id !== id)))
      .catch(error => console.error(error));
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleViewEvent = (id) => {
    navigate(`/view-event/${id}`);
  };

  const handleViewRegistrations = (id) => {
    navigate(`/event-registrations/${id}`);
  };

  // Add the navigate to edit-event page function
  const handleEditEvent = (id) => {
    navigate(`/edit-event/${id}`);
  };

  return (
    <div className="admin-dashboard container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <button onClick={handleCreateEvent} className="btn btn-primary mb-4">Create Event</button>
      <div className="row">
        {events.map(event => (
          <div key={event.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <button onClick={() => handleDelete(event.id)} className="btn btn-danger me-2">Delete</button>
                <button onClick={() => handleEditEvent(event.id)} className="btn btn-warning me-2">Edit</button>
                <button onClick={() => handleViewEvent(event.id)} className="btn btn-info me-2">View</button>
                <button onClick={() => handleViewRegistrations(event.id)} className="btn btn-success">View Registrations</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
