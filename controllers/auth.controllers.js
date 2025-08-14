const userModel = require("../models/users.models.js");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    // Validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide All Fields'
      });
    }

    // Check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: 'Email Already Registered please LogIn',
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await userModel.create({
      userName,
      email,
      password : hashedPassword,
      phone,
      address,
      answer
    });
    //Send response
    res.status(201).send({
      success: true,
      message: 'User Registered Successfully',
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        password: user.password, // Note: Do not send password in response in production
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
    res.status(500).send({
      success: false,
      message: 'Error In Register API',
      error
    });
  }
};


//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide All Fields'
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Password',
      });
    }

    // Generate JWT token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    user.password = undefined; // Remove password from response

    // Send response
    res.status(200).send({
      success: true,
      message: 'Login Successful',
      token,
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        password: user.password, // Note: Do not send password in response in production
        phone: user.phone,
        address: user.address,
        userType: user.userType,
        profile: user.profile,
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error In Login API',
      error
    });
  }
};

module.exports = {registerController, loginController};
