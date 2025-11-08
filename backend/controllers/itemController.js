// backend/controllers/itemController.js
const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const body = { ...req.body, createdBy: req.user?._id };
    const item = await Item.create(body);
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.getItems = async (req, res) => {
  try {
    // basit filtreleme: ?target=mosquito&type=spray&minPrice=5&maxPrice=30
    const { target, type, minPrice, maxPrice, q } = req.query;
    const where = {};
    if (target) where.targets = target;
    if (type) where.type = type;
    if (minPrice || maxPrice) where.price = {
      ...(minPrice ? { $gte: Number(minPrice) } : {}),
      ...(maxPrice ? { $lte: Number(maxPrice) } : {})
    };
    if (q) where.name = { $regex: q, $options: 'i' };

    const items = await Item.find(where).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) { res.status(400).json({ error: err.message }); }
};
