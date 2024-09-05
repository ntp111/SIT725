const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const studentModel = require("./models/studentModel");

const app = express();
const server = http.createServer(app);  // Use http server
const io = socketIo(server);  // Initialize socket.io with the server

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let port = process.env.PORT || 3040;  // Use PORT, not port

// Connect to the database
studentModel.connectDB();

// Set up routes
app.use("/", express.static(__dirname + "/views"));
app.use("/", studentRoutes(io));

// Socket.IO logic for handling connections and messages
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle the disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server using 'server.listen()' instead of 'app.listen()'
server.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
