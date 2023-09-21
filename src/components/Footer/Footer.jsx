import React from "react";
import { Box, Typography } from "@mui/material";


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {


  return (
    <Box display='flex' alignItems='center' flexDirection='column' padding={2}>
      <Typography component='div'>
        &copy; Prime Digital Academy
      </Typography>
    </Box>
  );

  // <footer>
  //   <div>&copy; Prime Digital Academy</div>
  //   <button onClick={history.push('/registration')}>Register</button>
  //   </footer>;
}

export default Footer;
