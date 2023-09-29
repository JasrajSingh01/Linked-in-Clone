import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "../App.css";
import { useState } from "react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

function AppBody() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {/* {loading ? (
        <BarLoader
          className="loader"
          loading={loading}
          color="#0288d1"
          size={30}
        />
      ) : ( */}
      <div className="app__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
      {/* )} */}
    </>
  );
}

export default AppBody;
