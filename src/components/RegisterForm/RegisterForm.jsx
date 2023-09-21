import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, TextField, Button } from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Box
      component="form"
      onSubmit={registerUser}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        boxShadow: 2,
        borderRadius: 2,
        padding: 2,
        maxWidth: 400,
        margin: "auto",
        marginTop: 8,
      }}
    >
      <Box>
        <Typography component="h3" variant="h4">
          REGISTER
        </Typography>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
      </Box>
      <Box>
        <TextField
          type="text"
          variant="outlined"
          label="Username:"
          value={username}
          color="secondary"
          onChange={(event) => setUsername(event.target.value)}
          required
          sx={{ margin: 1 }}
        ></TextField>
        <TextField
          type="password"
          variant="outlined"
          label="Password:"
          value={password}
          color="secondary"
          onChange={(event) => setPassword(event.target.value)}
          required
          sx={{ margin: 1 }}
        ></TextField>
      </Box>
      <Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;
