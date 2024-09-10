import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './CreateEvent.css';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DDTHH:MM format for the datetime-local input's min attribute
  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = { title, description, eventDate, category };

    axios.post('/api/events', newEvent)
      .then(() => {
        navigate('/admin-dashboard');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create Event</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eventDate" className="form-label">Event Date:</label>
                  <input
                    type="datetime-local"
                    id="eventDate"
                    className="form-control"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={getCurrentDateTime()} // Set the minimum date to today
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category:</label>
                  <input
                    type="text"
                    id="category"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Create Event</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
