import React from "react";
import "../css/home.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "../App.css";
function AppBody() {
  return (
    <>
      <div className="app__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </>
  );
}

export default AppBody;
