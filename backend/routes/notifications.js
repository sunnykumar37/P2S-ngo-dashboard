const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { auth } = require('../middleware/auth');

// Get user's notifications
router.get('/', auth, async (req, res) => {
  try {
    const match = { recipient: req.user._id };
    const sort = { createdAt: -1 };

    // Filter by read status
    if (req.query.read !== undefined) {
      match.read = req.query.read === 'true';
    }

    const notifications = await Notification.find(match)
      .populate('relatedDonation')
      .sort(sort)
      .limit(parseInt(req.query.limit) || 20)
      .skip(parseInt(req.query.skip) || 0);

    const total = await Notification.countDocuments(match);
    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      read: false
    });

    res.json({
      notifications,
      total,
      unreadCount,
      limit: parseInt(req.query.limit) || 20,
      skip: parseInt(req.query.skip) || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark notification as read
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      recipient: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark all notifications as read
router.patch('/read-all', auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete notification
router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 