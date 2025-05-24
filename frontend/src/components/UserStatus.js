import React, { useState } from 'react';

export default function UserStatus() {
  const [username, setUsername] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState('');

  const fetchComplaints = async () => {
    if (!username) return;
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/user/${username}`);
      if (res.ok) {
        const data = await res.json();
        setComplaints(data);
        setMessage(data.length === 0 ? 'No complaints found.' : '');
      } else {
        setMessage('Error fetching complaints.');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div>
      <h2>Check Your Complaints and Replies</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={fetchComplaints}>Check Status</button>

      {message && <p>{message}</p>}

      {complaints.map(c => (
        <div key={c._id} style={{ border: '1px solid #333', margin: '10px', padding: '10px' }}>
          <p><b>Title:</b> {c.title}</p>
          <p><b>Description:</b> {c.description}</p>
          <p><b>Verified:</b> {c.verified ? 'Yes' : 'No'}</p>
          <p><b>Admin Reply:</b> {c.reply || 'No reply yet'}</p>
        </div>
      ))}
    </div>
  );
}
