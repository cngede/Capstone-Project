const express = require("express");
const sqlite = require ('better-sqlite3');
const path = require("path");
const bodyParser = require('body-parser');
// Creating the Express server
const app = express();

// Server configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(5000, () => {
  console.log("Server started (http://localhost:5000/) !");
});


//const { initAppointmentDb } = require('./app.js')


  //module.exports = db; //make public (export) the database connection object (db).
 // initAppointmentDb();



// GET /
/*const patientsInfo = {
  patients: 'patients'
}*/
app.get("/", (req, res) => {
  // res.send("Hello world...");
  res.render("index");
});



/*
// Insert
app.post('/patients', (req, res) => {
  const { id } = req.body;
  const query = 'SELECT * FROM patients WHERE id = ?';
  db.all(query, [category], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while fetching data from the database');
    }
    res.render('patients', { patients: rows });
  });
});

*/
function createPatientInfo(){
db.run(`CREATE TABLE IF NOT EXISTS patients(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  date DATETIME NOT NULL,
  time TIME NOT NULL,
  message TEXT NOT NULL
)`, () => {
  db.each('SELECT count(*) AS patientDetails FROM patients', (err, row) => {
    if (err) throw err
    console.log(`No.: ${row.patientDetails}`)
  })
})}



    
function addToDb(name, phone, email, date, time, message){
  let db = sqlite("patients.db");
  const patientInfo = db.prepare (`insert into patients (name, phone, email, date, time, message) values (?, ?, ?, ?, ?, ?);`);
  const patientInfoNew =  patientInfo.run(name, phone, email, date, time, message);
  // console.log(patientInfoNew);
  return patientInfoNew;
  }


  addToDb("Mark Smith", 502-555-6666, "marksmith@gmail.com", 11/30/2023, '11:00', "I need help with implant issue" );






//create a new patient by submitting new patient info from the appointment form


// Insert
app.post('/patients', (req,res) => {
  //let db = sqlite("patients.db");
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database(':memory:')
  db.run('insert into patients (name, phone, email, date, time, message) values (?, ?, ?, ?, ?, ?)', 
      function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New patient has been added successfully");
        res.send("New patient has been added into the database with name = "+req.body.name);
      });
  });





/*

   app.post("/patients/", (req, res, next) => {
  let db = sqlite("patients.db");
  let data = `{
    name: ${req.body.name},
    phone: ${req.body.phone},
    email: ${req.body.email},
    date: ${req.body.date},
    time: ${req.body.time},
    message: ${req.body.message}
    
}`;
  const errors=[]
  if (!req.body.name){
      errors.push("No name specified");
  }

  if (!req.body.phone){
    errors.push("No phone specified");
  }

  if (!req.body.email){
      errors.push("No email specified");
  }
  if (!req.body.date){
    errors.push("No date specified");
  }
  if (!req.body.time){
    errors.push("No time specified");
  }
  if (!req.body.message){
    errors.push("No message specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  
  const sql ='insert into patients (name, phone, email, date, time, message) values (?, ?, ?, ?, ?, ?););'
  const params =[data.name, data.phone, data.email, data.date, data.time, data.message]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
})

*/



/*
// GET /data
app.get("/data", (req, res) => {
  const test = {
    title: "Test",
    items: ["one", "two", "three"]
  };
  res.render("data", { model: test });
});

*/






/*function addToDb(name, phone, email, date, time, message){
  let db = sqlite("patients.db");
  const patientInfo = db.prepare (`insert into patients (name, phone, email, date, time, message) values (?, ?, ?, ?, ?, ?);`);
  const patientInfoNew =  patientInfo.run(name, phone, email, date, time, message);
  // console.log(patientInfoNew);
  return patientInfoNew;
  }

  addToDb("John Doe", 502-5442233, "johndoe@gmail.com", 11/20/2023, '12:00', "I need help with root canal issue" );
*/


app.get('/patients', (req, res) =>{
  let db = sqlite("patients.db");
  const start = db.prepare("select name, phone, email, date, time, message from patients");
  const infoFromDb = start.all();
  res.send(JSON.stringify(infoFromDb));
  })
  
  




//const { addToDb } = require('./app.js')

/* const sqlite3 = require("sqlite3").verbose();
const patients = path.join('/patients', "data", "patients.db");
const db = new sqlite3.Database(patients, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'appt.db'");
});  */









