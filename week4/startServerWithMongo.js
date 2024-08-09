let express = require("express");
const bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.json());
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://ngtuanphong98:themaple2511@725week4.ieis32u.mongodb.net/?retryWrites=true&w=majority&appName=725week4";

let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db().collection("Student");
    console.log(collection);
  } catch (ex) {
    console.error(ex);
  }
}

app.get("/", function (req, res) {
  res.render("indexMongo.html");
});

app.get("/students", async (req, res) => {
  try {
    const students = await collection.find().toArray();

    const formattedData = students.map((student) => {
      const birthday = new Date(student.birthday);
      const age = new Date().getFullYear() - birthday.getFullYear() - 
        (new Date() < new Date(birthday.setFullYear(birthday.getFullYear() + 1)) ? 1 : 0);

      return {
        id: student._id.toString(), // Ensure ID is a string for Tabulator
        name: `${student.first_name} ${student.last_name}`,
        age: age,
        dob: birthday.toISOString().split("T")[0], // Format as YYYY-MM-DD
        hobbyCount: (student.hobby && Array.isArray(student.hobby)) ? student.hobby.length : 0,
        hobbyDetails: (student.hobby && Array.isArray(student.hobby)) ? student.hobby : [],
        gpa: student.gpa ?? 0,
        address: student.address ?? "",
      };
    });

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/students', async (req, res) => {
  try {
    const student = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: req.body.dob,
      gpa: req.body.gpa,
      address: req.body.address,
      hobby: Array.isArray(req.body.hobby) ? req.body.hobby : []
    };

    const result = await collection.insertOne(student);
    res.json({ message: 'Student added successfully', studentId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log("express server started");
  runDBConnection();
});

