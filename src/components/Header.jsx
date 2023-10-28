import {
  BusinessCenter,
  Chat,
  Home,
  Notifications,
  Search,
  SupervisorAccount,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { React } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import { selectUser } from "../features/userSlice";
import HeaderOptions from "./HeaderOptions";
import Menu from "./Menu";

function Header() {
  const user = useSelector(selectUser);

  // Navigation State
  const Navigate = useNavigate();

  function loginFunc() {
    Navigate("/signIn");
  }

  return (
    <div className="header">
      <div className="header__left">
        <img src="/Linkedin-Logo.svg" alt="Logo" />
        <div className="header__search">
          <Search sx={{ color: "#000" }} />
          <input type="text" placeholder="Search"></input>
        </div>
      </div>
      <div className="header__right">
        <HeaderOptions Icon={Home} title="Home" />
        <HeaderOptions Icon={SupervisorAccount} title="My Network" />
        <HeaderOptions Icon={BusinessCenter} title="Jobs" />
        <HeaderOptions Icon={Chat} title="Messaging" />
        <HeaderOptions Icon={Notifications} title="Notifications" />
        {user ? (
          <>
            <div className="headerOption">
              <Menu />
            </div>
          </>
        ) : (
          <Button
            variant="outlined"
            sx={{ borderRadius: 5 }}
            onClick={loginFunc}
          >
            Sign In
          </Button>
        )}
      </div>
      <div className="header__hamburger">
        <HeaderOptions Icon={MenuIcon} />
      </div>
    </div>
  );
}

export default Header;
