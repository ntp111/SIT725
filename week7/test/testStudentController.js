let expect;

before(async function () {
  const chai = await import("chai");
  expect = chai.expect;
});

const sinon = require("sinon");
const studentController = require("../controllers/studentController");
const studentModel = require("../models/studentModel");
const httpMocks = require("node-mocks-http");

describe("Student Controller", function () {
  let req, res, sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should fetch students and format data correctly", async function () {
    const mockStudents = [{
      _id: "1",
      first_name: "John",
      last_name: "Doe",
      birthday: "2000-01-01",
      hobby: ["Reading"]
    }];

    sandbox.stub(studentModel, "getStudents").resolves(mockStudents);

    await studentController.getStudents(req, res);
    const data = res._getJSONData();

    expect(res.statusCode).to.equal(200);
    expect(data).to.be.an("array");
    expect(data[0].name).to.equal("John Doe");
  });

  it("should handle errors in getStudents", async function () {
    sandbox.stub(studentModel, "getStudents").rejects(new Error("Database error"));

    await studentController.getStudents(req, res);
    const data = res._getJSONData();

    expect(res.statusCode).to.equal(500);
    expect(data.error).to.equal("Database error");
  });
});
