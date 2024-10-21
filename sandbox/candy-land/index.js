const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const db = require('./config/db'); // Ensure you connect to your database here
const router = require('./routes'); // Import the router

// Set the view engine and views location
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware for parsing application/json
app.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing multipart/form-data
app.use(upload.array());

// Use the candy router for the '/candy' route
app.use('/candy', router.candyRouter);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
