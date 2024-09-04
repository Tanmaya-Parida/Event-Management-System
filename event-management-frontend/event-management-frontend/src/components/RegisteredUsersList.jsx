// RegisteredUsersList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RegisteredUsersList.css';

const RegisteredUsersList = () => {
  const [registrations, setRegistrations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/events/${id}/registrations`)
      .then(response => setRegistrations(response.data))
      .catch(error => console.error("There was an error fetching the registration data!", error));
  }, [id]);

  return (
    <div className="registered-users-list-container">
      <h1>Registered Users</h1>
      {registrations.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registration Time</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.id}</td>
                <td>{registration.name}</td>
                <td>{registration.email}</td>
                <td>{new Date(registration.registrationTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users registered for this event yet.</p>
      )}
    </div>
  );
};

export default RegisteredUsersList; // Default export
