import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LandingPage.css';
import './styles/UserComplaintForm.css';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Online Complaint Box</h1>
      <button onClick={() => navigate('/user')}>User</button>
      <button onClick={() => navigate('/admin-login')}>Admin</button>
    </div>
  );
};

export default LandingPage;
