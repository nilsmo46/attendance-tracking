import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./login.css";

const Login = (props) => {
  // const classes = useStyles();
  const [selectCheckBox, setSelectCheckBox] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (selectCheckBox && email && password) {
      setError(false);
      axios
        .post("http://localhost:5000/api/student/login", {
          email,
          password,
          role: selectCheckBox,
        })
        .then((res) => {
          props.setUser({...res.data, role: selectCheckBox});
        })
        .catch((err) => {
          setError(true);
          setErrorMessage('Not Valid User');
          props.setUser({
            name: "",
            email: "",
          });
        });
    } else {
      setErrorMessage('Fill in all details');
      setError(true);
    }
  };
  return (
    <div className="main-login">
      <TextField
        id="outlined-basic"
        label="Email"
        variant="filled"
        className="mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="filled"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mb-3 checkboxes">
        <FormControlLabel
          control={
            <Checkbox
              aria-label="Checkbox for following text input"
              checked={selectCheckBox === "student"}
              onChange={() => setSelectCheckBox("student")}
              color="primary"
            />
          }
          label="Student"
        />
        <FormControlLabel
          control={
            <Checkbox
              aria-label="Checkbox for following text input"
              checked={selectCheckBox === "teacher"}
              onChange={() => setSelectCheckBox("teacher")}
              color="primary"
            />
          }
          label="Teacher"
        />
      </div>
      <Button
        variant="dark"
        onClick={() => handleLogin()}
        className="loginbutton"
      >
        Login
      </Button>
      {error && <span className="errorclass">{errorMessage}</span>}
    </div>
  );
};

export default Login;
