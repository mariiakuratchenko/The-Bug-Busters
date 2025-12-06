// backend/routes/items.js
const express = require("express");
const router = express.Router();

//  fake data:
const fakeItems = [
  {
    id: 1,
    name: "Mosquito Guard Spray",
    category: "Spray",
    price: 14.99,
  },
  {
    id: 2,
    name: "Outdoor Bug Zapper Pro",
    category: "Electric Zapper",
    price: 39.99,
  },
  {
    id: 3,
    name: "Lavender Mosquito Coil",
    category: "Coil",
    price: 7.49,
  },
];

// GET /api/items
router.get("/", (_req, res) => {
  res.json(fakeItems);
});

// GET /api/items/:id 
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = fakeItems.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
});

module.exports = router;
