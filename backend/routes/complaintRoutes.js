const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getComplaints,
  verifyComplaint,
  replyComplaint,
  getUserComplaints, 
  } = require('../controllers/complaintController');

router.post('/', createComplaint);
router.post('/admin', getComplaints);
router.put('/:id/verify', verifyComplaint);
router.put('/:id/reply', replyComplaint);
router.post('/user', getUserComplaints);


module.exports = router;
