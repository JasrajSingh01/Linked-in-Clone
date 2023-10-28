import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebaseFiles/firebase";
import { signOut } from "firebase/auth";

export default function AccountMenu() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Navigation State
  const Navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function logoutFunc() {
    dispatch(logout);
    signOut(auth);
    Navigate("/signIn");
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 0,
            }}
            src={user?.photoUrl}
            className="sidebar__avatar"
          >
            {user?.email[0]}
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              display: "none",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchororigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{
            display: "flex",
          }}
          onClick={handleClose}
        >
          <Avatar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 0,
            }}
            src={user?.photoUrl}
            className="sidebar__avatar"
          >
            {user?.email[0]}
          </Avatar>
          <b>{user.displayName}</b>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutFunc}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
