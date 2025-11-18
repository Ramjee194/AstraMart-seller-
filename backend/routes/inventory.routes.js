// routes/inventory.js
import express from 'express'
const router = express.Router();
import Inventory from '../models/Inventory';

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find({ sellerId: req.user.id });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single inventory item
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findOne({ 
      _id: req.params.id, 
      sellerId: req.user.id 
    });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update inventory item
router.put('/:id', async (req, res) => {
  try {
    const { stock, lowStockThreshold, cost, price } = req.body;
    
    const updatedItem = await Inventory.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.id },
      { 
        stock,
        lowStockThreshold,
        cost,
        price,
        value: stock * cost,
        status: stock === 0 ? 'outofstock' : 
                stock <= lowStockThreshold ? 'lowstock' : 'active',
        lastUpdated: new Date()
      },
      { new: true }
    );
    
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Quick restock
router.patch('/:id/restock', async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await Inventory.findOne({ 
      _id: req.params.id, 
      sellerId: req.user.id 
    });
    
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    const newStock = item.stock + quantity;
    const updatedItem = await Inventory.findOneAndUpdate(
      { _id: req.params.id },
      { 
        stock: newStock,
        value: newStock * item.cost,
        status: newStock === 0 ? 'outofstock' : 
                newStock <= item.lowStockThreshold ? 'lowstock' : 'active',
        lastRestocked: new Date()
      },
      { new: true }
    );
    
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;