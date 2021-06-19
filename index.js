const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json());

app.use(cors());

const students = require('./server/routes/students');
const teachers = require('./server/routes/teachers');

app.use('/api/student', students);
app.use('/api/teacher', teachers);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});