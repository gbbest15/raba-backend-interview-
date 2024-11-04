import mongoose, { Schema } from 'mongoose';

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  location: { type: String, required: true },
  deliveryOptions: [{
    type: String,
    enum: ['standard', 'expedited'],
    required: true
  }]
}, {
  timestamps: true
});

export const SupplierModel = mongoose.model('Supplier', SupplierSchema);