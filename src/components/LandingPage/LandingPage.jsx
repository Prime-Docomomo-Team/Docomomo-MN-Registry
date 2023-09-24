import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import GoogleMap from "./GoogleMap";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import Filters from "./Filters";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <GoogleMap />
      <Filters />
    </div>
  );
}

export default LandingPage;
