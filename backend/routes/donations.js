const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { auth, adminAuth } = require('../middleware/auth');

// Create new donation
router.post('/', auth, async (req, res) => {
  try {
    const donation = new Donation({
      ...req.body,
      donor: req.user._id
    });
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all donations (with filters)
router.get('/', auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};

    // Filter by status
    if (req.query.status) {
      match.status = req.query.status;
    }

    // Filter by category
    if (req.query.category) {
      match.category = req.query.category;
    }

    // Filter by donor
    if (req.query.donor) {
      match.donor = req.query.donor;
    }

    // Sort options
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const donations = await Donation.find(match)
      .populate('donor', 'name email')
      .populate('collectedBy', 'name email')
      .sort(sort)
      .limit(parseInt(req.query.limit) || 10)
      .skip(parseInt(req.query.skip) || 0);

    const total = await Donation.countDocuments(match);

    res.json({
      donations,
      total,
      limit: parseInt(req.query.limit) || 10,
      skip: parseInt(req.query.skip) || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single donation
router.get('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name email')
      .populate('collectedBy', 'name email');

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update donation status (admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['status', 'collectedBy', 'collectedAt', 'distributedTo', 'distributedAt'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    updates.forEach(update => donation[update] = req.body[update]);
    await donation.save();

    res.json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete donation (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 