const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.get("/students", studentController.getStudents);
router.post("/students", studentController.addStudent);

module.exports = router;
