import React from "react";
import "../css/home.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "../App.css";
// import { useState } from "react";
// import { BarLoader } from "react-spinners";
function AppBody() {
  // const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {/* {isLoading ? (
        <BarLoader loading={isLoading} color="#0288d1" size={30} />
      ) : ( */}
      <>
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      </>
      {/* )} */}
    </>
  );
}

export default AppBody;
