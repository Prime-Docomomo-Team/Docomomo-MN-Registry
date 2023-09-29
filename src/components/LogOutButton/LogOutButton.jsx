import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      sx={{ color: "#242424" }}
      onClick={() => dispatch({ type: "LOGOUT" })}
    >
      Logout
    </Button>
  );
}

export default LogOutButton;
