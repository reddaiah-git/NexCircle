const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, deleteEventAdmin } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Admin routes
router.route('/users').get(protect, authorize('admin'), getAllUsers);
router.route('/users/:id').delete(protect, authorize('admin'), deleteUser);
router.route('/events/:id').delete(protect, authorize('admin'), deleteEventAdmin);

module.exports = router;
