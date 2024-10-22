const express = require('express');
const Shipment = require('../models/Shipment');
const router = express.Router();

// Create a new shipment
router.post('/', async (req, res) => {
  const { origin, destination, weight, expectedDelivery } = req.body;
  try {
    const shipment = new Shipment({ origin, destination, weight, expectedDelivery });
    await shipment.save();
    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update shipment status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const shipment = await Shipment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a shipment
router.delete('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json({ message: 'Shipment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
