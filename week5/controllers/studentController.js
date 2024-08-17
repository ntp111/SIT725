const studentModel = require("../models/studentModel");

const getStudents = async (req, res) => {
  try {
    const students = await studentModel.getStudents();

    const formattedData = students.map((student) => {
      const birthday = new Date(student.birthday);
      const age =
        new Date().getFullYear() -
        birthday.getFullYear() -
        (new Date() < new Date(birthday.setFullYear(birthday.getFullYear() + 1))
          ? 1
          : 0);

      return {
        id: student._id.toString(),
        name: `${student.first_name} ${student.last_name}`,
        age: age,
        dob: birthday.toISOString().split("T")[0],
        hobbyCount: student.hobby && Array.isArray(student.hobby) ? student.hobby.length : 0,
        hobbyDetails: student.hobby && Array.isArray(student.hobby) ? student.hobby : [],
        gpa: student.gpa ?? 0,
        address: student.address ?? "",
      };
    });

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const student = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: req.body.dob,
      gpa: req.body.gpa,
      address: req.body.address,
      hobby: Array.isArray(req.body.hobby) ? req.body.hobby : [],
    };

    const result = await studentModel.addStudent(student);
    res.json({ message: "Student added successfully", studentId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStudents,
  addStudent,
};
