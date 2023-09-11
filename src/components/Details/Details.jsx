import { Box, Typography } from "@mui/material";

const Details = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        component="img"
        sx={{ height: 375, margin: "auto", borderRadius: 10 }}
        src="https://www.creativeboom.com/uploads/articles/07/07ce01e00f639f2cb0423886f647bf19bb12c01e_1620.jpg"
        alt="This is a placeholder image"
      ></Box>
      <Box>
        <Typography component="h2" variant="h4">
          Title of Site
        </Typography>
      </Box>
      <Box sx={{display: 'flex', gap: 8}}>
        <Box>
          <Typography component="p" variant="p" sx={{ fontWeight: "bold" }}>
            Address:
          </Typography>
          <Typography component="p" variant="p">
            123 Main Street, Saint Paul, MN
          </Typography>
        </Box>
        <Box>
          <Typography component="p" variant="p" sx={{ fontWeight: "bold", color: '' }}>
            Address:
          </Typography>
          <Typography component="p" variant="p">
            123 Main Street, Saint Paul, MN
          </Typography>
        </Box>
        <Box>
          <Typography component="p" variant="p" sx={{ fontWeight: "bold" }}>
            Address:
          </Typography>
          <Typography component="p" variant="p">
            123 Main Street, Saint Paul, MN
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
