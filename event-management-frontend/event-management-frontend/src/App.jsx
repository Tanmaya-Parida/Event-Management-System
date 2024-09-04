// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';

import ViewEvent from './components/ViewEvent';
import Navbar from './components/Navbar';
import RegisterEvent from './components/RegisterEvent';
import RegisteredUsersList from './components/RegisteredUsersList';
import 'bootstrap/dist/css/bootstrap.min.css';


// import LoginPage from './components/LoginPage';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/view-event/:id" element={<ViewEvent />} />
        <Route path="/register-event/:id" element={<RegisterEvent />} />
        <Route path="/event-registrations/:id" element={<RegisteredUsersList />} />
        {/* <Route path="/login" element={<LoginPage />} /> Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
