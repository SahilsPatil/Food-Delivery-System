import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get user's orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.menuItem')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order({
      user: req.user.id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

export default router;