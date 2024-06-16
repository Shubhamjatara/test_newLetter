import React from "react";
import Options from "../../components/Dashboard/Options/Options";
import Sidebar from "../../components/Dashboard/sideBar/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex overflow-y-auto">
      <Sidebar/>
      <Options/>
    </div>
  );
};

export default Dashboard;
