const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); // Import Mongoose
const authRoutes = require('./routes/authRoutes'); // Import auth routes for signup, login, logout

const app = express();

// MongoDB connection credentials
const username = 'guilfoyles1'; // Username
const password = 'Taggart13!'; // Password
const cluster = 'cluster0.dom40.mongodb.net'; // Cluster URL
const db = 'Messenger'; // Database name

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}/${db}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected successfully to MongoDB');

    // Middleware to parse incoming requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
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

    // Use the auth routes
    app.use('/', authRoutes); // User-related routes for signup, login, logout

    // Start the server
    const PORT = 3002;
    app.listen(PORT, () => {
      console.log(`cookiesApp listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
