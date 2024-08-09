let hobbies = [];

// Create the Tabulator instance
var table = new Tabulator("#example-table", {
	height: 405, // Set table height
	layout: "fitColumns", // Fit columns to width of table
	columns: [
		// Define Table Columns
		{ title: "Name", field: "name", width: 180 },
		{ title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
		{ title: "Hobbies", field: "hobbyCount", width: 110 },
		{
			title: "Date Of Birth",
			field: "dob",
			sorter: "date",
			hozAlign: "center",
		},
	],
});

table.on("rowClick", function (e, row) {
	const student = row.getData();

	// Create the student info HTML
	const studentInfoHtml = `
		<p><strong>Name:</strong> ${student.name}</p>
		<p><strong>Age:</strong> ${student.age}</p>
		<p><strong>Date of Birth:</strong> ${student.dob}</p>
		<p><strong>Talent:</strong> ${student.talent}</p>
		<p><strong>GPA:</strong> ${student.gpa}</p>
		<p><strong>Address:</strong> ${student.address}</p>
	`;

	// Set the student info in the modal
	document.getElementById("studentInfo").innerHTML = studentInfoHtml;

	// Initialize or update the hobby table in the modal
	let hobbyTable = new Tabulator("#studentHobbyTable", {
		layout: "fitColumns",
		height: 150,
		columns: [{ title: "Hobby", field: "hobby" }],
		data: student.hobbyDetails.map(hobby => ({ hobby: hobby })),
	});

	// Open the modal
	let modalInstance = M.Modal.getInstance(document.getElementById("studentModal"));
	modalInstance.open();
});



var hobbyTable = new Tabulator("#hobbyTable", {
	layout: "fitColumns",
	height: 150,
	columns: [{ title: "Hobby", field: "hobby", editor: "input" }],
	data: [],
});

// Function to fetch data and populate the table
function loadStudentData() {
	// Use setData() to fetch data from the server
	table
		.setData("/students")
		.then(function () {
			console.log("Data loaded successfully");
		})
		.catch(function (error) {
			console.error("Error loading data:", error);
		});
}
// Function to add hobby to the table and array
function addHobby() {
	const hobbyInput = $("#hobbyInput").val().trim();
	if (hobbyInput) {
		hobbies.push(hobbyInput);
		hobbyTable.addData([{ hobby: hobbyInput }]);
		$("#hobbyInput").val(''); // Clear the input
	} else {
		M.toast({ html: 'Please enter a hobby before adding!' });
	}
}


const formSummit = () => {
	let formData = {};
	formData.first_name = $("#first_name").val();
	formData.last_name = $("#last_name").val();
	formData.address = $("#address").val();
	formData.dob = $("#dob").val();
	formData.gpa = $("#gpa").val();
	formData.hobby = hobbies;

	console.log(formData);
	postStudent(formData);
};

$(document).ready(function () {
	loadStudentData();
	$("#formSubmit").click(() => {
		formSummit();
	});
	$("#addHobbyButton").click(() => {
		addHobby();
	});
	$(".modal").modal();
});

function closeModal(id){
	var modalInstance = M.Modal.getInstance(document.getElementById(id));
      modalInstance.close();
}
function postStudent(formData){
	fetch("/students", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(formData)
	})
	.then(response => response.json())
	.then(data => {
		alert("Student added successfully");
		closeModal("modal1");
		loadStudentData();
	})
	.catch(error => {
		console.error("Error:", error);
	});
}
