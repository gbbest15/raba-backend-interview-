import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  shippingTime: { type: Number, required: true }
}, {
  timestamps: true
});

export const ProductModel = mongoose.model('Product', ProductSchema);