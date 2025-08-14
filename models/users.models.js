const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
    userName: {
    type: String,
    required: [true, "User name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    address:{
        type: [String],
        required: [true, "Address is required"],
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"],
    },
    userType: {
        type: String,
        required: [true, "User type is required"],
        default: "client",
        enum: ["admin", "client", "vendor", "driver"],
    },
    profile:{
        type: String,
        required: [true, "Profile is required"],
        default: "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
    },
    answer:{
        type: String,
        required: [true, "Answer is required"],
    }
},
{
    timestamps: true,
}
);

//export model
module.exports = mongoose.model("User", userSchema);