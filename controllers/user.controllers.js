const mongoose = require('mongoose');
const userModel = require("../models/users.models");
const bcrypt = require("bcryptjs");
//GET USER INFO
// const userModel = require("../models/users.models");

const getUserController = async(req,res) => {
    try {
        //find User
        // const user = await userModel.findById(req.user.id);
        const user = await userModel.findById(req.user.id, {_id: 0}, {password: 0}); // Exclude _id and password from the response
        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }
        //send user data (excluding password)
        const { password, ...userData } = user._doc;
        return res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user: userData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error: error.message
        });
    }
};


// Update User Profile
const updateUserController = async (req,res) => {
    try {
        //find user
        const user = await userModel.findById(req.user.id);
        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }
        //update user
        const { userName, phone, address } = req.body;
        if (userName) user.userName = userName;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        await user.save();
        //send response
        res.status(200).send({
            success: true,
            message: "User Updated Successfully",
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                userType: user.userType,
                profile: user.profile,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Update User API",
            error: error.message
        });
    }
}

// Update User Password
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById(req.user.id);
        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }
        //get data from user
        const { oldPassword, newPassword } = req.body;
        //check old password
        if (!oldPassword || !user.password) {
            return res.status(400).send({
                success: false,
                message: "Please provide Old or New Password"
            });
        }
        //check user password || compare passwords
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Old Password is incorrect"
            });
        }
        //update password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        //send response
        res.status(200).send({
            success: true,
            message: "Password Updated Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Update Password API",
            error: error.message
        });
    }
}

// Reset Password Controller
const resetPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        // Validation
        if (!email || !answer || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            });
        }
        // Check user
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found or answer is incorrect"
            });
        }
        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        // Update password
        user.password = hashedPassword;
        await user.save();
        // Send response
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Reset Password API",
            error: error.message
        });
    }
}

//Delete User Profile
const deleteProfileController = async (req, res) => {
  try {
    const response = await userModel.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};

module.exports = {getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController};