// backend/app.js
console.log("APP.JS is working now");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const itemsRouter = require("./routes/items");

const app = express();

// ===== MIDDLEWARELER =====
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());

// ===== ROUTES =====

// Products / items endpoint
app.use("/api/items", itemsRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Auth routes (varsa)
app.use("/api/auth", require("./routes/authRoutes"));

// 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo error:", err.message));

// 404 middleware
app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server on ${port}`);
});
