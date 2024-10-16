const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const Pet = require('./models/pet'); // Import the Pet model

const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Set the view engine and views location
app.set('view engine', 'pug');
app.set('views', './views');

// MongoDB connection credentials
const username = 'guilfoyles1';   // Username
const password = 'Taggart13!';   // Password
const cluster = 'cluster0.dom40.mongodb.net'; // Cluster URL
const db = 'Messenger';         // Database name

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}/${db}?retryWrites=true&w=majority`, {
    // Removed useNewUrlParser and useUnifiedTopology to avoid warning message
})
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// GET route to render the pet form
app.get('/pet', (req, res) => {
  res.render('pet');
});

// POST route to handle form submission for adding a pet
app.post('/pet', (req, res) => {
  const petInfo = req.body;
  if (!petInfo.name || !petInfo.age || !petInfo.species) {
    res.render('show_message', {
      message: "Sorry, you did not provide all of the necessary info",
      type: "error",
    });
  } else {
    const newPet = new Pet({
      name: petInfo.name,
      age: petInfo.age,
      species: petInfo.species,
    });

    newPet.save()
      .then(() => {
        res.render('show_message', {
          message: "New pet added",
          type: "success",
          pet: petInfo,
        });
      })
      .catch((err) => {
        res.render('show_message', { message: "Database error", type: "error" });
      });
  }
});

// GET route to retrieve and display all pets
app.get('/all', (req, res) => {
  Pet.find({})
    .then((pets) => {
      res.render('show_all', { message: "Retrieved all pets", type: "success", pets });
    })
    .catch((err) => {
      res.render('show_all', { message: "Database error", type: "error" });
    });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
