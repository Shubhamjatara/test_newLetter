import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import RootRoutes from "./routes/root.Routes";

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-[#111827]">
        <RootRoutes />
      </div>
    </>
  );
}

export default App;
