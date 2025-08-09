const JWT = require("jsonwebtoken");

module.exports = (req,res,next) =>   {
    try{
        const token = req.headers["authorization"].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized user",
                });
            }else {
                req.user = { id: decoded.id }; // Set user info to req.user instead of req.body
                next();
            }
        });
    }catch(error) {
        console.error("Authentication error:", error);
        return res.status(500).send({
            success: false,
            message: "Please provide an auth token",
            error: error.message
        });
    }
}