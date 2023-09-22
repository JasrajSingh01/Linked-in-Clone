import React from "react";
import "../css/headerOptions.css";
import { Avatar, Button } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function HeaderOptions({ avatar, Icon, title, onClick }) {
  const user = useSelector(selectUser);

  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headerOption__icon" />}
      {avatar && (
        <Avatar className="headerOption__icon" src={user?.photoUrl}>
          {user?.email[0]}
        </Avatar>
      )}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  );
}

export default HeaderOptions;
