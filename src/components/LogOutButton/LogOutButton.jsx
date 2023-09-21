import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      sx={{ color: "#FFFFFF" }}
      onClick={() => dispatch({ type: "LOGOUT" })}
    >
      Logout
    </Button>
  );
}

export default LogOutButton;
