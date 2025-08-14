const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const createRestaurant = require('../controllers/resturant.controllers');

const router = express.Router();

//create a new restaurant
router.post('/create', authMiddleware, createRestaurant);

module.exports = router;