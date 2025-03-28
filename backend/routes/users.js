const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const match = {};
    const sort = {};

    // Filter by role
    if (req.query.role) {
      match.role = req.query.role;
    }

    // Filter by status
    if (req.query.status) {
      match.status = req.query.status;
    }

    // Sort options
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const users = await User.find(match)
      .select('-password')
      .sort(sort)
      .limit(parseInt(req.query.limit) || 10)
      .skip(parseInt(req.query.skip) || 0);

    const total = await User.countDocuments(match);

    res.json({
      users,
      total,
      limit: parseInt(req.query.limit) || 10,
      skip: parseInt(req.query.skip) || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID (admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'role', 'status'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    updates.forEach(update => user[update] = req.body[update]);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user statistics (admin only)
router.get('/stats/overview', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const inactiveUsers = await User.countDocuments({ status: 'inactive' });
    
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt');

    res.json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      roleStats,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 