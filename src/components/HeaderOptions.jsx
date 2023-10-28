import React from "react";
import "../css/headerOptions.css";
import { Avatar, Tooltip } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function HeaderOptions({ avatar, Icon, title, onClick, toolTip }) {
  const user = useSelector(selectUser);

  return (
    <Tooltip title={toolTip}>
      <div onClick={onClick} className="headerOption">
        {Icon && <Icon className="headerOption__icon" />}
        {avatar && (
          <Avatar className="headerOption__icon" src={user?.photoUrl}>
            {user?.email[0]}
          </Avatar>
        )}
        {title && <h3 className="headerOption__title">{title}</h3>}
      </div>
    </Tooltip>
  );
}

export default HeaderOptions;
