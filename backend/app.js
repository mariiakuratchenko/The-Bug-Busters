// backend/app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(cors());
app.use(helmet());

// --- DB ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo error", err));

// --- Routes ---
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", require("./routes/authRoutes"));   // <-- EKLEDİK
app.use("/api/users", require("./routes/userRoutes"));  // <-- EKLEDİK
app.use("/api/items", require("./routes/itemRoutes"));  // (vardı, kalsın)

// 404 (bulunamadı)
app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ message: "Not Found" });
});

// Genel hata yakalayıcı
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on ${port}`));

// (İstersen testler için)
// module.exports = app;
