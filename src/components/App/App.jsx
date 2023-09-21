import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Details from "../Details/Details";
import SitesDatabase from "../DatabaseTable/SitesDatabase";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";
import SitePhotosDatabase from "../DatabaseTable/SitePhotosDatabase";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log('Here is the user:', user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  //MUI theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F8642F",
      },
      secondary: {
        main: "#D4D4D4",
        light: "#F2F2F2",
        dark: "#7B89996",
      },
    },
    typography: {
      fontFamily: "Jost, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /home page
                <Redirect to="/home" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/home" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              <LandingPage />
            </Route>
            <Route exact path="/details/:id">
              <Details />
            </Route>
            <Route exact path="/sites-database">
              {user.admin ? (
                //If the user is an admin, show SitesDatabase
                <SitesDatabase />
              ) : (
                //Otherwise, show LandingPage
                <LandingPage />
              )}
            </Route>
            <Route exact path="/site-photos-database">
              <SitePhotosDatabase />
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
