const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log('Mongo connected'))
  .catch(err=> console.error('Mongo error', err));

// Routes

app.use('/api/items', require('./routes/itemRoutes'));

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server on ${port}`));
