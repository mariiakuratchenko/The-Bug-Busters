const Item = require('../models/Item');

exports.createItem = async (req,res)=>{
  const {title, description} = req.body;
  const item = await Item.create({title, description, owner:req.user.id});
  res.status(201).json(item);
};

exports.getAll = async (req,res)=>{
  const items = await Item.find().populate('owner','name email');
  res.json(items);
};

exports.getOne = async (req,res)=>{
  const it = await Item.findById(req.params.id);
  if(!it) return res.status(404).json({message:'Not found'});
  res.json(it);
};

exports.updateItem = async (req,res)=>{
  const it = await Item.findById(req.params.id);
  if(!it) return res.status(404).json({message:'Not found'});
  if(it.owner.toString() !== req.user.id && req.user.role!=='admin')
    return res.status(403).json({message:'Forbidden'});
  it.title = req.body.title ?? it.title;
  it.description = req.body.description ?? it.description;
  await it.save();
  res.json(it);
};

exports.removeItem = async (req,res)=>{
  const it = await Item.findById(req.params.id);
  if(!it) return res.status(404).json({message:'Not found'});
  if(it.owner.toString() !== req.user.id && req.user.role!=='admin')
    return res.status(403).json({message:'Forbidden'});
  await it.deleteOne();
  res.json({message:'Deleted'});
};
