import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AddDashboard from "./components/AddDashboard";

const App = () => {
  let styleObject = (obj) => {
    if (obj.isActive === true) {
      return {
        backgroundColor: "grey",
        color: "white",
        textDecoration: "none",
      };
    }
  };

  return (
    <div>
    <Router>
      <ToastContainer />
      <nav className="navsection">
        <ul>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/signup"
          >
            <li>Signup</li>
          </NavLink>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/"
          >
            <li>Login</li>
          </NavLink>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/forgot-password"
          >
            <li>forgot-password</li>
          </NavLink>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/reset-password"
          >
            <li>Reset-Password</li>
          </NavLink>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/dashboard"
          >
            <li>dashboard</li>
          </NavLink>
          <NavLink
            style={(item) => {
              return styleObject(item);
            }}
            to="/form"
          >
            <li>Emp Form</li>
          </NavLink>
        </ul>
      </nav>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<EmployeeDashboard/>}/>
        <Route path="/form" element={<AddDashboard/>}/>
      </Routes>
    </Router>
    </div>
    
    
  );
};

export default App;
