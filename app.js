// Import dependencies
const express = require('express')
const sqlite = require ('better-sqlite3');
const port = 3000


// initialize express App
const app = express();
exports.app = app;

const {router} = require('./patients.js');
app.use('/patients', router);

//const patientsRouter = require('./patients');
//app.use('/users', patientsRouter);


// Configure middleware
app.use(express.json())


// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//to post form data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


  function initAppointmentDb(){
    let newAppointmentDb = `CREATE TABLE IF NOT EXISTS "patients"(
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TIME NOT NULL,
    "message" TEXT NOT NULL,
    "id" INTEGER, PRIMARY KEY("id")
    );`;
    let db = sqlite("patients.db");
    db.prepare(newAppointmentDb).run();
    }

    //module.exports = db; //make public (export) the database connection object (db).
    initAppointmentDb();

    exports.initAppointmentDb = initAppointmentDb;

   

  
    //function to insert records to the database

    
function addToDb(name, phone, email, date, time, message){
  let db = sqlite("patients.db");
  const patientInfo = db.prepare (`insert into patients (name, phone, email, date, time, message) values (?, ?, ?, ?, ?, ?);`);
  const patientInfoNew =  patientInfo.run(name, phone, email, date, time, message);
  // console.log(patientInfoNew);
  return patientInfoNew;
  }


  addToDb("John Doe", 5025442233, "johndoe@gmail.com", 11/20/2023, '12:00', "I need help with root canal issue" );
  
  exports.addToDbDb = addToDb;

  
 app.get('/patients', (req, res) =>{
  let db = sqlite("patients.db");
  const start = db.prepare("select name, phone, email, date, time, message from patients");
  const infoFromDb = start.all();
  res.send(JSON.stringify(infoFromDb));
  })
  

 
  //get one patient from the db
  /*app.get("/patients/:id", (req, res, next) => {
    const sql = "select * from patients where id = ?"
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

*/

app.use(express.json());
app.post('/patients', (req, res) =>{
  let db = sqlite("patientss.db");
  let results = addToDb ("req.body.name, req.body.phone, req.body.email, req.body.date, req.body.time, req.body.message");
  const infofromDb = start.all();
  res.send(JSON.stringify(results));
  })
  

  



/*
//create a new patient by submitting new patient info from the appointment form
app.post("/patients/", (req, res, next) => {
  let db = sqlite("patients.db");
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
  let data = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      message: req.body.message
      
  }
  const sql ='insert into patients (name, phone, email, date, time, message) values (?, ?, ?, ?, ?, ?);`);'
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





// Update patient records
app.patch("/patients/:id", (req, res, next) => {
  let db = sqlite("patients.db");
  let data = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      message: req.body.message
      
  }
  db.run(
      `UPDATE patients set 
         name = COALESCE(?,name), 
         phone = COALESCE(?,phone),
         email = COALESCE(?,email), 
         date = COALESCE(?,date),
         time = COALESCE(?,time),
         message = COALESCE(?,message),
         WHERE id = ?`,
      [data.name, data.phone, data.email, data.date, data.time, data.message, req.params.id],
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({
              message: "success",
              data: data,
              changes: this.changes
          })
  });
})


//Delete a patient info from the db
app.delete("/patients/:id", (req, res, next) => {
  let db = sqlite("patients.db");
  db.run(
      'DELETE FROM patients WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({"message":"deleted", changes: this.changes})
  });
})