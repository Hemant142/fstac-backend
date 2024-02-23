const mongoose = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

// Get the MongoDB connection URI from environment variables
const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB
const connection = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = connection;
