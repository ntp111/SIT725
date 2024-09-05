let expect;
(async () => {
  const chai = await import("chai");
  expect = chai.expect;
})();

const sinon = require("sinon");
const studentModel = require("../models/studentModel");

describe("Student Model", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should get students from the database", async function () {
    const mockStudents = [{ first_name: "John", last_name: "Doe", hobby: [] }];

    sandbox.stub(studentModel, "getStudents").resolves(mockStudents);

    const students = await studentModel.getStudents();
    expect(students).to.be.an("array").that.has.lengthOf(1);
    expect(students[0].first_name).to.equal("John");
  });

  it("should add a student to the database", async function () {
    const student = { first_name: "Phong", last_name: "Nguyen", hobby: ["Travelling"] };

    sandbox.stub(studentModel, "addStudent").resolves({ insertedId: "12345" });

    const result = await studentModel.addStudent(student);
    expect(result.insertedId).to.equal("12345");
  });
});
