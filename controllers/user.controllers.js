//GET USER INFO

const getUserController = async(req,res) => {
    try {
        //find User
        const user = await usersModels.findById({_id:req.body.id});
        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error: error.message
        });
    }
};

module.exports = {getUserController};