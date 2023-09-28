import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import docomomoLogo from "../../images/docomomoLogo.png";

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [database, setDatabase] = useState('');

  const handleSelect = (event) => {
    console.log('Event target value', event.target.value);
    history.push(`/${event.target.value}`);
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/home">
          <Box
            component="img"
            src={docomomoLogo}
            height='2rem'
            alt="docomomo MN US logo"
            sx={{ margin: 2, marginLeft: 0 }}
            onClick={history.push("/home")}
          ></Box>
        </Link>
        <Box display='flex' gap={1} margin={1.5}>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links

            <Link to="/login">
              <Button sx={{ color: "#FFFFFF" }}>Login</Button>
            </Link>
          )}

          {/* If a user is an admin, show the sites database button */}
          {user.admin && (
            <Box sx={{ minWidth: 120  }}>
              <FormControl fullWidth sx={{color: 'white'}}>
                <InputLabel sx={{color: 'white'}} >Database</InputLabel>
                <Select
                  
                  label="Database"
                  onChange={handleSelect}
                >
                  <MenuItem value='sites-database'>Sites Database</MenuItem>
                  <MenuItem value='site-photos-database'>Photos Database</MenuItem>
                  <MenuItem value='user-database'>User Database</MenuItem>
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
