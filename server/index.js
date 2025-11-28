const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/users');
require("dotenv").config();

const app = express();

// ===== BODY PARSER =====
app.use(express.json());

// ===== CORS HANDLER FOR VERCEL =====
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173", 
    "https://crud-client-khaki.vercel.app"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ===== MONGOOSE CONNECTION =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// ===== ROUTES =====

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single user
app.get('/getUser/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create user
app.post('/createUser', async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update user
app.put('/updateUser/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete user
app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export for Vercel (IMPORTANT!)
module.exports = app;