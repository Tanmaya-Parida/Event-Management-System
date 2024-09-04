// src/components/RegisterEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './RegisterEvent.css';

const RegisterEvent = () => {
  const { id } = useParams();  // Event ID from URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const registrationData = { name, email };

    axios.post(`/api/events/${id}/register`, registrationData)
      .then(() => {
        alert('Registration successful! A confirmation email has been sent.');
        navigate('/');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="register-event-container">
      <h1>Register for Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterEvent;
