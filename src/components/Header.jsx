import { React, useEffect, useState } from "react";
import "../css/header.css";
import {
  Search,
  Home,
  SupervisorAccount,
  BusinessCenter,
  Chat,
  Notifications,
} from "@mui/icons-material";
import HeaderOptions from "./HeaderOptions";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseFiles/firebase";
import { Button, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Loading
  const [loading, setLoading] = useState(false);
  // UseEffect for loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  function logoutFunc() {
    setLoading(true);
    dispatch(logout);
    signOut(auth);
    setLoading(false);
    navigate("/");
  }

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
            // onClick={loginFunc}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
