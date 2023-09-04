import React from "react";
import "../css/header.css";
import {
  Search,
  Home,
  SupervisorAccount,
  BusinessCenter,
  Chat,
  Notifications,
  // Person,
} from "@mui/icons-material";
import HeaderOptions from "./HeaderOptions";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img src="/Linkedin-Logo.svg" alt="Logo" />
        <div className="header__search">
          <Search />
          <input type="text" placeholder="Search"></input>
        </div>
      </div>
      <div className="header__right">
        <HeaderOptions Icon={Home} title="Home" />
        <HeaderOptions Icon={SupervisorAccount} title="My Network" />
        <HeaderOptions Icon={BusinessCenter} title="Jobs" />
        <HeaderOptions Icon={Chat} title="Messaging" />
        <HeaderOptions Icon={Notifications} title="Notifications" />
        <HeaderOptions
          avatar="https://api.dicebear.com/7.x/adventurer/svg?seed=Ginger&skinColor=ecad80,f2d3b1"
          title="Me"
        />
      </div>
    </div>
  );
}

export default Header;
