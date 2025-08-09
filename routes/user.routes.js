const express = require('express');
const { getUserController } = require('../controllers/user.controllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const authMiddlewares = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
// GET USER || GET
router.get('/getUser', authMiddlewares, getUserController);

module.exports = router;