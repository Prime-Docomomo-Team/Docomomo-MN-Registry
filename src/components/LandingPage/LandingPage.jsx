import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { useLoadScript } from "@react-google-maps/api";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import Map from "./Map";
import Filters from "./Filters";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.AIzaSyA2mhiqPJm36ipnXDQOBzBxPcQKO-Q691c,
  });

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      {!isLoaded ? <div>Loading...</div> : <Map />}
      <Filters />
    </div>
  );
}

export default LandingPage;
