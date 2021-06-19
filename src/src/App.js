import { useState } from "react";
import "./App.css";
import Login from "./components/login";
import DashBoard from "./components/dashboard";
import TeacherDashboard from "./components/teacherDashboard";

function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  return (
    <div className="App">
      <h1>Attendance Tracking Application</h1>
      {user.role && (
        <h3>{`${
          user.role.charAt(0).toUpperCase() + user.role.slice(1)
        } Portal`}</h3>
      )}
      {!user.name ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          {user.role === "student" ? (
            <DashBoard user={user} />
          ) : (
            <TeacherDashboard />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
