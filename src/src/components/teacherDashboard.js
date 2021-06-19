import React, { useState } from "react";
import {
  Grid,
  List,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import "./teacherDashboard.css";

const allClasses = [
  { name: "Class 1", value: 1 },
  { name: "Class 2", value: 2 },
  { name: "Class 3", value: 3 },
  { name: "Class 4", value: 4 },
  { name: "Class 5", value: 5 },
];

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState(0);
  const [overAll, setOverAll] = useState(0);
  const [classData, setClassData] = useState([]);
  const fetchStudents = (val) => {
    setSelectedClass(val);
    axios
      .post("http://localhost:5000/api/teacher/getbyclass", {
        classname: val,
      })
      .then((res) => {
        let total = 0;
        res.data.data.map((d) => {
          const percentage = parseFloat((d.attendanceCount / 30) * 100).toFixed(
            2
          );
          console.log(percentage)
          total = total + percentage;
          return null;
        });
        setClassData(res.data.data);
        setOverAll(parseFloat(( parseInt(total)  / res.data.data.length)).toFixed(2) || 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="teacher-div">
      <Grid item xs={12} md={6}>
        <div className="list-div">
          <Typography variant="h4">List Of Classes</Typography>
          <List dense={true}>
            {allClasses.map((k) => (
              <li key={k.name} className="nameBox">
                <div
                  onClick={() => fetchStudents(k.value)}
                  className={`clickBox mb-3 ${
                    selectedClass === k.value ? "selected" : ""
                  }`}
                >
                  {k.name}
                </div>
              </li>
            ))}
          </List>
        </div>
      </Grid>
      {selectedClass ? (
        <Grid>
          <div className="table-div">
            <h2>{`Student List of Class ${selectedClass}`}</h2>
            <h2>{`Overall Percentage ${overAll}%`}</h2>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Class</TableCell>
                    <TableCell align="right">Section</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Attendance% (1 Month)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classData.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.class}</TableCell>
                      <TableCell align="right">{row.section}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">
                        {parseFloat((row.attendanceCount / 30) * 100).toFixed(
                          2
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      ) : (
        <h2>Please Select a Class from the List</h2>
      )}
    </div>
  );
};

export default TeacherDashboard;
