const express = require("express");
const { testUserController } = require("../controllers/test.controllers");

//router object
const router = express.Router();

//route to test the server
router.get("/test-user", testUserController);

//exporting the router
module.exports = router;
