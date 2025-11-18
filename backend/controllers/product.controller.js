import Product from '../models/Product.js';
import Vendor from '../models/Vendor.js';

// Create Product
export const createProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res.status(403).json({ message: 'Only vendors can create products' });
    }

    const { title, description, price, category, stock } = req.body;

    const images = (req.files || []).map(f => ({
      url: f.location || f.path,
      key: f.key || f.filename
    }));

    const product = new Product({
      vendor: vendor._id,
      title,
      description,
      price,
      category,
      stock,
      images
    });

    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });

  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    //  Ensure only product’s vendor can update
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor || product.vendor.toString() !== vendor._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const update = req.body;

    if (req.files && req.files.length) {
      const images = req.files.map(f => ({
        url: f.location || f.path,
        key: f.key || f.filename
      }));
      update.images = [...product.images, ...images];
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, update, { new: true });

    res.json({ message: 'Product updated successfully', product: updatedProduct });

  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// List Products with Filters + Pagination
export const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, q, category } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('vendor', 'businessName')
      .lean();

    res.json(products);

  } catch (error) {
    console.error('List Products Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get Single Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendor', 'businessName');

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);

  } catch (error) {
    console.error('Get Product Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
