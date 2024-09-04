import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import { FaSearch } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  useEffect(() => {
    filterEvents(selectedDate, searchTerm);
  }, [selectedDate, searchTerm, events]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterEvents = (date, search) => {
    let filtered = events;

    if (date) {
      // Normalize dates to remove time components
      const selectedDay = new Date(date).setHours(0, 0, 0, 0);
      console.log('Selected Date (normalized):', new Date(selectedDay).toISOString());

      filtered = filtered.filter(event => {
        const eventDate = new Date(event.eventDate).setHours(0, 0, 0, 0);
        console.log('Event Date (normalized):', new Date(eventDate).toISOString());
        return eventDate === selectedDay;
      });
    }

    if (search) {
      filtered = filtered.filter(event => event.title.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredEvents(filtered);
  };

  const handleRegister = (id) => {
    navigate(`/register-event/${id}`);
  };

  return (
    <div className="home-page container mt-4">
      <h1 className="mb-4 text-center">Event Calendar</h1>
      <div className="filters mb-4">
        <div className="row align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="calendar-style"
            />
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by Event Name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control search-input"
              />
              <span className="input-group-text"><FaSearch /></span>
            </div>
          </div>
        </div>
      </div>
      {filteredEvents.length > 0 ? (
        <div className="event-list">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-item card mb-4 p-3 shadow-lg">
              <h2 className="card-title mb-2">{event.title}</h2>
              <p className="card-text">{event.description}</p>
              <div className="d-flex justify-content-between">
                <button
                  onClick={() => handleRegister(event.id)}
                  className="btn btn-primary"
                >
                  Register
                </button>
                <Link to={`/view-event/${event.id}`} className="btn btn-secondary">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No events found for the selected criteria.</p>
      )}
    </div>
  );
};

export default HomePage;
