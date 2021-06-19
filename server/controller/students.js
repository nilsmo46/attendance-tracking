const crud = require("../model/model");
const table = "student";
const db = require("../Utils/DB");

const markpresent = (req, res) => {
  const { studentId } = req.body;
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  db.query(
    `insert into attendance (studentId, date) values ("${studentId}", "${formattedDate}");`,
    (err, rows) => {
      if (err) {
        res.status(200).json({
          data: "Try Again",
        });
      } else {
        res.status(200).json({
          data: "Attendance Taken",
        });
        db.query(`UPDATE student SET attendanceCount = attendanceCount + 1 where studentId="${studentId}"`)
      }
    }
  );
};

const login = (req, res) => {
  const { email, password, role } = req.body;

  crud.getById("email", email, role, (err, rows) => {
    if (err) {
      res.status(200).json({
        success: false,
        message: "Error",
      });
    } else {
      if (rows.length > 0 && password === rows[0].password) {
        res.status(200).json({
          name: rows[0].name,
          email: rows[0].email,
        });
      } else {
        res.status(404).json({
          data: "Wrong Password",
        });
      }
    }
  });
};

const getMe = (req, res) => {
  const { email } = req.body;

  crud.getById("email", email, table, (err, rows) => {
    let response;
    if (err) {
      res.status(200).json({
        data: "Not Found",
      });
    } else {
      response = {
        studentId: rows[0].studentId,
        name: rows[0].name,
        email: rows[0].email,
        class: rows[0].class,
        section: rows[0].section,
      };
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      db.query(
        `SELECT t1.countvalue, t2.presentvalue
        FROM (SELECT COUNT(studentId) AS countvalue FROM attendance where studentId="${rows[0].studentId}") AS t1, 
        (select COUNT(studentId) AS presentvalue  from attendance where date="${formattedDate}" and studentId="${rows[0].studentId}") AS t2;`,
        (err, rows1) => {
          if (err) {
            console.log(err);
          } else {
            console.log(rows[0].id, rows1);
            response.attendanceCount = rows1[0].countvalue;
            response.marked = rows1[0].presentvalue ? true : false;
            res.status(200).json({
              data: response,
            });
          }
        }
      );
    }
  });
};

module.exports = { markpresent, getMe, login };
