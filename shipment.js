const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  weight: { type: Number, required: true },
  status: { type: String, default: 'In Transit' },
  expectedDelivery: { type: Date, required: true },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports = Shipment;
