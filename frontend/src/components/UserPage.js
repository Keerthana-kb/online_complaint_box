import React, { useState } from 'react';
import axios from 'axios';
import './styles/UserComplaintForm.css';

const UserPage = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [viewName, setViewName] = useState('');
  const [complaints, setComplaints] = useState([]);

  const submitComplaint = async () => {
    if (!name || !subject || !message) {
      alert('Please fill all fields');
      return;
    }

    await axios.post('http://localhost:5000/api/complaints', {
      name,
      subject,
      message
    });

    alert('Complaint submitted!');
    setName('');
    setSubject('');
    setMessage('');
  };

  const fetchUserComplaints = async () => {
    if (!viewName) {
      alert('Please enter your name');
      return;
    }

    const res = await axios.post('http://localhost:5000/api/complaints/user', {
      name: viewName
    });

    setComplaints(res.data);
  };

  return (
    <div className="container">
      <h2>Submit Complaint</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Complaint Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={submitComplaint}>Submit Complaint</button>

      <hr />

      <h2>Check Your Complaint Status</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={viewName}
        onChange={e => setViewName(e.target.value)}
      />
      <button onClick={fetchUserComplaints}>View My Complaints</button>

      {complaints.map(c => (
        <div key={c._id} className="card">
          <p><strong>Subject:</strong> {c.subject}</p>
          <p><strong>Message:</strong> {c.message}</p>
          <p><strong>Verified:</strong> {c.verified ? 'Yes' : 'No'}</p>
          <p><strong>Admin Reply:</strong> {c.reply || 'No reply yet'}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
