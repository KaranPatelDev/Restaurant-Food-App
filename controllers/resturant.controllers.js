const restaurantModel = require("../models/resturant.models");

const createRestaurant = async (req, res) => {
    try {
        const{title, imageUrl,foods,time,pickUp,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body;
        //validation
        if(!title || !coords) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            });
        }
        //create restaurant
        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickUp,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });
        //save restaurant
        await newRestaurant.save();
        //send response
        res.status(201).send({
            success: true,
            message: "Restaurant Created Successfully",
            restaurant: newRestaurant
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Create Restaurant API",
            error: error.message
        });
    }
};


module.exports = createRestaurant;