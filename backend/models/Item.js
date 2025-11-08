// backend/models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },           // “Citronella Coil”, “ZapMaster 3000”
    brand: { type: String, default: 'Generic' },
    type: {                                                       // ürün tipi
      type: String,
      enum: ['spray', 'lotion', 'coil', 'plug_in_electric', 'ultrasonic', 'trap'],
      required: true
    },
    targets: {                                                    // hangi böcek grupları
      type: [String],
      enum: ['mosquito', 'fly', 'spider', 'wasp', 'ant', 'moth', 'roach'],
      required: true
    },
    activeIngredient: { type: String },                           // “DEET 25%”, “Picaridin 20%”, “Citronella”
    form: { type: String, default: '' },                          // “aerosol”, “liquid”, “pad”, “device”
    isElectric: { type: Boolean, default: false },
    power: { type: String, default: '' },                         // “120V AC”, “USB 5V”
    coverageAreaSqm: { type: Number, min: 0 },                    // etki alanı
    durationHours: { type: Number, min: 0 },                      // koruma süresi
    safeForPets: { type: Boolean, default: false },
    indoorUse: { type: Boolean, default: true },
    outdoorUse: { type: Boolean, default: true },

    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },

    rating: { type: Number, min: 0, max: 5, default: 0 },
    images: { type: [String], default: [] },
    description: { type: String, default: '' },
    warnings: { type: String, default: '' },                      // “Keep away from children…”
    tags: { type: [String], default: [] },                         // “eco”, “deet-free”, “wasps”

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
