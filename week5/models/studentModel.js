const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://ngtuanphong98:themaple2511@725week4.ieis32u.mongodb.net/?retryWrites=true&w=majority&appName=725week4";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let collection;

async function connectDB() {
  try {
    await client.connect();
    collection = client.db().collection("Student");
    console.log("Connected to MongoDB");
  } catch (ex) {
    console.error(ex);
  }
}

async function getStudents() {
  return await collection.find().toArray();
}

async function addStudent(student) {
  return await collection.insertOne(student);
}

module.exports = {
  connectDB,
  getStudents,
  addStudent,
};
