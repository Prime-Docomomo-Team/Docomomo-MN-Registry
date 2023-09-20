import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box } from "@mui/material";
import docomomoLogo from "../../images/docomomoLogo.png";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <AppBar position="static" sx={{ boxShadow: 0 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/home">
          <Box
            component="img"
            src={docomomoLogo}
            height={45}
            alt="docomomo MN US logo"
            sx={{ margin: 2, marginLeft: 0 }}
          ></Box>
        </Link>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link to="/login">Login / Register</Link>
        )}
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
