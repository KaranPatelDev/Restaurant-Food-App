const express = require('express');
const { getUserController, updateUserController } = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET USER || GET
router.get('/getUser', authMiddleware, getUserController);

// UPDATE Profile
router.put('/updateUser', authMiddleware, updateUserController);

module.exports = router;