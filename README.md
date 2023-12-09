# Capstone-Project

This capstone project, a fictitious online dental office is meant to solve the problem faced by most dental offices.
For many years, Omnis Dental has been using manual appointment booking system. Though they have an existing website, they do not update this because it is only for advertisement purposes. Appointments on this website can be made by sending an e-mail to the office assistant of Omnis Dental, but because of the busy schedule of this firm, they cannot always monitor their emails and confirm appointments of clients in a timely and efficient manner. As a result, difficulties are experienced by Omnis Dental.
Omnis Dental is having a problem on data redundancy. Appointments through phone calls, e-mails and walk-ins are written repeatedly in their logbook. Cancellations of appointments are also written repeatedly in their logbook.
There are cases when clients want to book appointments on the same date without knowing that the scheduled date has already been taken. In such cases, conflict in schedule is faced by the dental office.
Security of data is also one of their problems. The receptionist is only using a logbook for appointment booking. If the logbook was lost, the dental office does not have any back-up files for the appointments. 
With these problems, Omnis dental is really alarmed. They cannot compete with others easily and if this would continue it may result to losses or worse, bankruptcy. I therefore, proposed to make an online appointment booking application that would surely lessen the burden of the management, improve their efficiency, and solve the problems of Omnis Dental.

Features included are as follows:
1. A node.js express server that serves the API using the native http module in the app.js file (backend). 
When a patient’s information is submitted on the request appointment page a list of scheduled appointments is displayed in JSON format. This is displayed in localhost:3000/patients.
2. A SQLite database that stores patients’ information when a new patient submits his/her information on the appointment page or if an existing patient updates information.
3. Regex is  used on contact.html and appointment.html pages to validate email input. When user inputs name and email, there is a popup that advises if email is valid or invalid.
5. A table created from a JSON array is displayed as a table in index.html. The JSON data is in the table.js file.

## Special Requirements

In order to run properly, mentors will need to install the following...

1. Express.js. Used for this project is version 4.18.2.
2. Node.js. I used version v20.9.0 for this project.
3. SQlite – better-sqlite3 version 9.1.1 was used for the database.
After these packages are installed, you must run "npm start" in the code terminal and the project will display in your browser at "localhost:3000/patients".

For this project, I elected to include the following 4 features from the Code: You requirement list:
1. "Use arrays to store and retrieve information that is displayed in your app." I created array that is displaying images on the home page. 
2. "Use a regular expression to validate user input and prevent any invalid input." My contact form and appointment page form require an "@" and if any of the inputs are invalid, a message will appear telling the user about the problem and will disappear once the criteria listed above are met.
3. Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.  Basic math functions don’t count (e.g. addition, etc). Many functions were created in app.js for the get, post, update and delete methods for interacting with the database.
4. "Create a node.js web server and serve at least one rout in addition to index.html." My app uses Express.js to serve 3 html routes and display them on localhost:3000/patients. 
5. Persist data to an external API and make the stored data accessible in your app (including after reload/refresh). Form data from appointment page is sent to the server (app.js) and routed to the database (patient.db).
6. Interact with a database to store and retrieve information (e.g. MySQL, MongoDB, etc). I used better-sqlite3 to store patients’ information.

This project optimized to displays differently for desktop and mobile devices.

Image credits: Jonathan Borba, Caroline LM@unsplash.com.
