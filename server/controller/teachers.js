const db = require("../Utils/DB");

const getByStudentClass = (req, res) => {
  const { classname } = req.body;
  db.query(`SELECT * FROM student where class="${classname}";`, (err, rows) => {
    if (err) {
      res.status(200).json({
        data: "Try Again",
      });
    } else {
      res.status(200).json({
        data: rows,
      });
    }
  });
};

module.exports = getByStudentClass;
