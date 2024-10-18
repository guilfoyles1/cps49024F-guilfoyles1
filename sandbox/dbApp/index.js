const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const petRoutes = require('./routes/petRoutes'); // Import pet routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes for signup, login, logout

const upload = multer();
const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());

// Session configuration for persistent login
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use true in production with HTTPS
}));

// Set the view engine and views location
app.set('view engine', 'pug');
app.set('views', './views');

// MongoDB connection credentials
const username = 'guilfoyles1';   // Username
const password = 'Taggart13!';   // Password
const cluster = 'cluster0.dom40.mongodb.net'; // Cluster URL
const db = 'Messenger';         // Database name

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}/${db}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use the routes
app.use('/pets', petRoutes); // Pet-related routes
app.use('/', authRoutes); // User-related routes for signup, login, logout

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
