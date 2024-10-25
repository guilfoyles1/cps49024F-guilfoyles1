const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const petRoutes = require('./routes/petRoutes'); // Import pet routes

const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// MongoDB connection credentials
const username = 'guilfoyles1'; // Username
const password = 'Taggart13!'; // Password
const cluster = 'cluster0.dom40.mongodb.net'; // Cluster URL
const db = 'Messenger'; // Database name

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}/${db}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use petRoutes with no prefix, so /pet and /all work directly
app.use('/', petRoutes);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`dbApp listening on port ${PORT}`);
});
