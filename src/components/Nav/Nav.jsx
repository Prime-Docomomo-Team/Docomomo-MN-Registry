import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography } from '@mui/material'

function Nav() {
  const user = useSelector((store) => store.user);

  return (

      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link to="/home">
            <Typography variant="h5" component="h2">
              Minnesota Modern Registry
            </Typography>
          </Link>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Link to="/login">
              Login / Register
            </Link>
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
