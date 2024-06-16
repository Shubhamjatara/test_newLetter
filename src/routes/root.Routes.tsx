import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/loginPage/LoginPage";
import Dashboard from "../pages/Dashboard/Dashboard";

function RootRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default RootRoutes;
