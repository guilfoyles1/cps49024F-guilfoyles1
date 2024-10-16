const express = require('express');
const Pet = require('../models/pet'); // Adjusted path for Pet model
const router = express.Router();

// GET route to render the pet form
router.get('/pet', (req, res) => {
  res.render('pet');
});

// POST route to handle form submission for adding a pet
router.post('/pet', (req, res) => {
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
router.get('/all', (req, res) => {
  Pet.find({})
    .then((pets) => {
      res.render('show_all', { message: "Retrieved all pets", type: "success", pets });
    })
    .catch((err) => {
      res.render('show_all', { message: "Database error", type: "error" });
    });
});

module.exports = router;
