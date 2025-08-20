const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET USER || GET
router.get('/getUser', authMiddleware, getUserController);

// UPDATE Profile
router.put('/updateUser', authMiddleware, updateUserController);

//Password Update
router.post("/updatePassword", authMiddleware, updatePasswordController);

//Reset Password
router.post("/resetPassword", authMiddleware, resetPasswordController);

//delete user
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController);

module.exports = router;