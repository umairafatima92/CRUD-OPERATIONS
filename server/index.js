const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/users');
require("dotenv").config();

const app = express();

// BODY PARSER 
app.use(express.json());

// CORS HANDLER FOR VERCEL
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",

    "https://crud-client-khaki.vercel.app/"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

//MONGOOSE CONNECTION 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

//  ROUTES

// Root route
app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get single user
app.get('/getUser/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: err.message });
  }
});

// Create user
app.post('/createUser', async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const user = await userModel.create(req.body);
    console.log("User created:", user);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update user
app.put('/updateUser/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete user
app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", user });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = app;