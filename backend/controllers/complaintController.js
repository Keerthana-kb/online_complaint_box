const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  const { name, subject, message } = req.body;
  const newComplaint = new Complaint({ name, subject, message });
  await newComplaint.save();
  res.status(201).json(newComplaint);
};


exports.getComplaints = async (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const complaints = await Complaint.find();
    res.json(complaints);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

exports.verifyComplaint = async (req, res) => {
  const { id } = req.params;
  await Complaint.findByIdAndUpdate(id, {
    verified: true,
    status: 'Verified'
  });
  res.sendStatus(200);
};
exports.replyComplaint = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  await Complaint.findByIdAndUpdate(id, {
    reply,
    status: 'Replied'
  });
  res.sendStatus(200);
};
// Get user complaints by name
exports.getUserComplaints = async (req, res) => {
  const { name } = req.body;
  try {
    const complaints = await Complaint.find({ name });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};



