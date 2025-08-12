
const userModel = require("../models/users.models");
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

module.exports = {getUserController, updateUserController};