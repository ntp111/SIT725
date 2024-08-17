const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const studentModel = require("./models/studentModel");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let port = process.env.port || 3000;

// Connect to the database
studentModel.connectDB();

// Set up routes
app.use("/", express.static(__dirname + "/views"));
app.use("/", studentRoutes);

app.listen(port, () => {
  console.log("Express server started");
});
