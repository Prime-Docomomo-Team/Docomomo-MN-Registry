import { Box, Typography } from "@mui/material";

const Details = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box
        component="img"
        sx={{ width: 300, margin: auto, borderRadius: 10 }}
        src="https://www.creativeboom.com/uploads/articles/07/07ce01e00f639f2cb0423886f647bf19bb12c01e_1620.jpg"
        alt="This is a placeholder image"
      ></Box>
      <Box>
        <Typography component='h2'>Title of Site</Typography>
      </Box>
    </Box>
  );
};

export default Details;
