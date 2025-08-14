const mongoose = require("mongoose");

//schema
const restaurantSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Restaurant title is required"],
        },
        imageUrl: {
            type: String,
            required: [true, "Image URL is required"],
        },
        foods:{type: Array, default: []},
        time:{
            type: String,
        },
        pickup:{
            type: Boolean,
            default: true,
        },
        delivery:{
            type: Boolean,
            default: true,
        },
        isOpen:{
            type: Boolean,
            default: true,
        },
        logoUrl: {
            type: String,
        },
        rating: {
            type: Number,
            default: 1,
            min: 1,
            max: 5,
        },
        ratingCount: {type: String},
        code: {
            type: String,
            required: [true, "Restaurant code is required"],
            unique: true,
        },
        coords:{
            id:{type:String},
            latitude:{type:Number},
            latitudeDelta:{type:Number},
            longitude:{type:Number},
            longitudeDelta:{type:Number},
            address:{type:String},
            title:{type:String},
        }
    },{timestamps: true}
);

//export model
module.exports = mongoose.model("Restaurant", restaurantSchema);