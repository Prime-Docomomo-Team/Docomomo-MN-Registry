import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import docomomoLogo from "../../images/docomomoLogo.png";

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <AppBar position="static" sx={{ boxShadow: 0, bgcolor: "secondary.light" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/home">
          <Box
            component="img"
            src={docomomoLogo}
            height="2rem"
            alt="docomomo MN US logo"
            sx={{ margin: 2, marginLeft: 0 }}
            onClick={history.push("/home")}
          ></Box>
        </Link>
        <Box display="flex" gap={1} margin={1.5}>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links

            <Link to="/login">
              <Button sx={{ color: "primary.main" }}>Login</Button>
            </Link>
          )}

          {/* If a user is an admin, show the sites database button */}
          {user.admin && (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ color: "white" }}>
                <InputLabel sx={{ color: "primary.main" }}>Database</InputLabel>
                <Select label="Database">
                  <MenuItem
                    value="sites-database"
                    component={Link}
                    to="/sites-database"
                  >
                    Sites Database
                  </MenuItem>
                  <MenuItem
                    value="site-photos-database"
                    component={Link}
                    to="/site-photos-database"
                  >
                    Photos Database
                  </MenuItem>
                  <MenuItem
                    value="user-database"
                    component={Link}
                    to="/user-database"
                  >
                    User Database
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          {/* If a user is logged in, show logout button */}
          {user.id && <LogOutButton className="navLink" />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
