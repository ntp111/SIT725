const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

// Modify the export to accept `io`
module.exports = function(io) {
  // Pass `io` to the controller
  router.get("/students", studentController.getStudents);

  // Pass `io` in the post route
  router.post("/students", (req, res) => studentController.addStudent(req, res, io));

  return router;
};
