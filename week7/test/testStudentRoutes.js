let expect;
(async () => {
  const chai = await import("chai");
  expect = chai.expect;
})();

const request = require("request");

describe("Student API", function () {
  const baseURL = "http://localhost:3000";

  it("GET /students should return status 200 and array of students", function (done) {
    request(`${baseURL}/students`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      body = JSON.parse(body);
      expect(body).to.be.an("array");
      done();
    });
  });

  it("POST /students should add a student and return success message", function (done) {
    const student = {
      first_name: "Phong",
      last_name: "Nguyen",
      dob: "2000-01-01",
      gpa: 3.5,
      address: "123 Main St",
      hobby: ["Reading", "Swimming", "Travelling"]
    };

    request.post({
      url: `${baseURL}/students`,
      json: true,
      body: student
    }, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body.message).to.equal("Student added successfully");
      done();
    });
  });
});
