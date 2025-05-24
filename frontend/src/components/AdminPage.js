import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminLogin.css';

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/complaints/admin', {
        username: 'admin',
        password: 'admin@123'
      });
      setComplaints(res.data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  const verifyComplaint = async id => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${id}/verify`);
      fetchComplaints();
    } catch (err) {
      console.error('Error verifying complaint:', err);
    }
  };

  const replyComplaint = async (id, reply) => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${id}/reply`, { reply });
      fetchComplaints();
    } catch (err) {
      console.error('Error replying to complaint:', err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      {complaints.map(c => (
        <div key={c._id} className="card">
          <p><strong>Name:</strong> {c.name}</p>
          <p><strong>Subject:</strong> {c.subject}</p>
          <p><strong>Message:</strong> {c.message}</p>
          <p><strong>Verified:</strong> {c.verified ? 'Yes' : 'No'}</p>
          <p><strong>Reply:</strong> {c.reply || 'No reply yet'}</p>
          <p><strong>Status:</strong> {c.status}</p>

          <button onClick={() => verifyComplaint(c._id)}>Verify</button>
          <button onClick={() => {
            const reply = prompt("Enter your reply:");
            if (reply) replyComplaint(c._id, reply);
          }}>Reply</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
