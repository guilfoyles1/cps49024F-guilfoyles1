const router = require('express').Router();
const candyController = require('../controllers/candy');

// Handle the GET route
router.get("/", candyController.getAllCandy);
router.get("/:company/:brand", candyController.getCandy);

// Handle the POST route
router.post("/", candyController.createCandy);

// Handle the PUT route
router.put("/:company/:brand", candyController.updateCandy);

// Handle the DELETE route
router.delete("/:company/:brand", candyController.deleteCandy);

module.exports = router;
