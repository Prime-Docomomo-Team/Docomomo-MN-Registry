import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { useLoadScript } from "@react-google-maps/api";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import Map from "./Map";
import Filters from "./Filters";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      {!isLoaded ? (
        <Box
          className="map-container"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Map />
      )}
      {isLoaded && <Filters />}
    </div>
  );
}

export default LandingPage;
