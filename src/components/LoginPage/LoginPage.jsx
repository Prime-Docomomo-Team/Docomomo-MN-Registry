import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function LoginPage() {

  return (
    <Box sx={{ minHeight: "75vh" }} display='flex' flexDirection='column' gap={2} alignItems='center'>
      <LoginForm />
      <Link to='/registration'><Typography component='div'>Register</Typography></Link>
    </Box>
  );
}

export default LoginPage;
