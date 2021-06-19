import { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { Button } from "react-bootstrap";

const DashBoard = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [fetched, setFetch] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/student/getme", {
        email: props.user.email,
      })
      .then((res) => {
        setUserDetails(res.data.data);
        setFetch(true);
      })
      .catch((err) => console.log);
  }, [fetched, props.user.email]);
  const handleAttendance = () => {
    axios
      .post("http://localhost:5000/api/student/markpresent", {
        studentId: userDetails.studentId,
      })
      .then((res) => {
        setUserDetails({
          ...userDetails,
          marked: true,
          attendanceCount: userDetails.attendanceCount + 1,
        });
      })
      .catch((err) => console.log);
  };
  return (
    <div className="main-dashboard">
      <span className="d-block mb-3">{`Welcome ${props.user.name} of class ${userDetails.class} and ${userDetails.section}`}</span>
      <span className="d-block mb-3">{`Your Email is ${userDetails.email}`}</span>
      <span className="d-block mb-3">{`Your Attendance Percent is ${
        (userDetails.attendanceCount / 30) * 100 || 0
      } %`}</span>
      <span className="text-danger">
        {userDetails.marked
          ? "You have already marked your attendance Today"
          : "Please Click the Button Below to Mark Attendance For Today"}
      </span>
      <Button
        variant="dark"
        onClick={() => handleAttendance()}
        className="loginbutton"
        disabled={userDetails.marked}
      >
        Mark Attendance
      </Button>
    </div>
  );
};

export default DashBoard;
