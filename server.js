const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

//dotenv config
dotenv.config();

//connect to database
connectDB();

//rest object
const app = express();

const PORT = process.env.PORT || 8080;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // It shows HTTP request logs in the console

//route
app.use("/api/v1/test", require("./routes/test.routes.js"));
app.use("/api/v1/auth", require("./routes/auth.routes.js"));
app.use("/api/v1/user", require("./routes/user.routes.js"));
app.use("/api/v1/resturant", require("./routes/resturant.routes.js"));
app.use("/api/v1/category", require("./routes/category.routes.js"));
app.use("/api/v1/food", require("./routes/food.routes.js"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Food Server App's Backend!</h1>");
});

//server listening
app.listen(PORT, () => {
  console.log(
    `The server is running at http://localhost:${PORT}`.bgBlue.white.bold
  );
});
