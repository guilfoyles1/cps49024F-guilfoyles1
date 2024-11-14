const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt'); // For password hashing
const router = express.Router();

// Middleware to check if a user is signed in
function checkAuth(req, res, next) {
  if (req.session.userId) {
    next(); // User is authenticated, proceed to the next middleware/route
  } else {
    res.status(401).send('You must be logged in to view this page');
  }
}

// Render the signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Redirect to login page after successful signup
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(500).send('Error creating user: ' + error.message);
  }
});

// Render the login form
router.get('/login', (req, res) => {
  res.render('login'); 
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    // Store user ID in session and set a new expiration
    req.session.userId = user._id;
    req.session.cookie.expires = new Date(Date.now() + 60 * 60 * 1000); // Set expiration to 1 hour

    // Redirect to a protected route after successful login
    res.redirect('/protected');
  } catch (error) {
    res.status(500).send('Error logging in: ' + error.message);
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('connect.sid', { path: '/' }); // Clear the session cookie
    res.send('Logout successful');
  });
});

// Example of a protected route
router.get('/protected', checkAuth, (req, res) => {
  res.send('This is a protected route. You are logged in!');
});

module.exports = router;
