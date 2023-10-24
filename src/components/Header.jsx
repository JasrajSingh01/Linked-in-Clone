import {
  BusinessCenter,
  Chat,
  Home,
  Notifications,
  Search,
  SupervisorAccount,
  Menu
} from "@mui/icons-material";
import { React } from "react";
import "../css/header.css";
import HeaderOptions from "./HeaderOptions";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebaseFiles/firebase";
// import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Navigation State
  const Navigate = useNavigate();

  function logoutFunc() {
    dispatch(logout);
    signOut(auth);
    Navigate("/signIn");
  }

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
          <HeaderOptions
            avatar="true"
            title={user?.displayName}
            onClick={logoutFunc}
          />
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
        <HeaderOptions Icon={Menu} />
      </div>
    </div>
  );
}

export default Header;
