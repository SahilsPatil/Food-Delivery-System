import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('MenuItem', menuItemSchema);