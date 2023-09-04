import React from "react";
import { Avatar } from "@mui/material";
import "../css/Sidebar.css";

const RecentItem = ({ topic }) => (
  <div className="sidebar__recentItem">
    <span className="sidebar__hash">#</span>
    <p>{topic}</p>
  </div>
);

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar__top">
      <img src="https://source.unsplash.com/WLUHO9A_xik/1600x900" alt="" />
      <Avatar className="sidebar__avatar" />
      <h2>Jasraj Singh</h2>
      <h4>jasraj.saggu@gmail.com</h4>
    </div>
    <div className="sidebar__stats">
      <div className="sidebar__stat"></div>
      <div className="sidebar__stat">
        <p>Who viewed you</p>
        <p className="sidebar__statNum">2,547</p>
      </div>
      <div className="sidebar__stat">
        <p>Views on post</p>
        <p className="sidebar__statNum">2,449</p>
      </div>
    </div>
    <div className="sidebar__bottom">
      <p>Recent</p>
      <RecentItem topic="React.js" />
      <RecentItem topic="Javascript" />
      <RecentItem topic="Next.js" />
      <RecentItem topic="SCSS" />
    </div>
  </div>
);

export default Sidebar;
