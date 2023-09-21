import React from "react";
import { Link, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import docomomoLogo from "../../images/docomomoLogo.png";

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <AppBar position="static" sx={{ boxShadow: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/home">
          <Box
            component="img"
            src={docomomoLogo}
            height={45}
            alt="docomomo MN US logo"
            sx={{ margin: 2, marginLeft: 0 }}
            onClick={history.push("/home")}
          ></Box>
        </Link>
        <Box>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links

            <Link to="/login">
              <Button sx={{ color: "#FFFFFF" }}>Login</Button>
            </Link>
          )}

          {/* If a user is an admin, show the sites database button */}
          {user.admin && (
            <Button
              color="secondary"
              onClick={() => history.push("/sites-database")}
            >
              Database
            </Button>
          )}
          {/* If a user is logged in, show logout button */}
          {user.id && <LogOutButton className="navLink" />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
