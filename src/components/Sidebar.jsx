import React from "react";
import { Avatar } from "@mui/material";
import "../css/Sidebar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const RecentItem = ({ topic }) => (
  <div className="sidebar__recentItem">
    <span className="sidebar__hash">#</span>
    <p>{topic}</p>
  </div>
);

const Sidebar = () => {
  const user = useSelector(selectUser);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src="https://source.unsplash.com/WLUHO9A_xik/1600x900" alt="" />
        <Avatar src={user?.photoURL} className="sidebar__avatar">
          {/* {user?.email[0]} */}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
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
};

export default Sidebar;
