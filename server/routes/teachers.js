const express = require("express");
const getByStudentClass = require("../controller/teachers");

const router = express.Router();

router.post("/getbyclass", getByStudentClass);

module.exports = router;
