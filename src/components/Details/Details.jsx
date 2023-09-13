import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";

const Details = () => {
  const history = useHistory();
  const siteDetails = useSelector((store) => store.details);
  console.log(siteDetails);

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#F2F2F2",
        width: "80%",
        margin: "auto",
      }}
    >
      <Grid container>
        <Grid item>
          <Button onClick={() => history.goBack}>BACK</Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={5}>
          <Box
            component="img"
            sx={{ borderRadius: 5 }}
            src="https://www.creativeboom.com/uploads/articles/07/07ce01e00f639f2cb0423886f647bf19bb12c01e_1620.jpg"
            alt="This is a placeholder image"
          ></Box>
        </Grid>
      </Grid>
      <Grid container padding={2} justifyContent="center">
        <Grid item>
          <Typography component="h2" variant="h3" color='primary'>
            Site Name
          </Typography>
          <Divider role='presentation' sx={{margin: 2}}/>

        </Grid>
      </Grid>
      <Grid container justifyContent="space-evenly" display="flex" gap={5}>
        <Grid
          item
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Grid item>
            <Typography component="h5" variant='h5' sx={{ fontWeight: "bold" }} color='primary'>
              Address
            </Typography>
          </Grid>
          <Grid item>
            <Typography>123 Main Street, Minneapolis, MN 55418</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Grid item>
            <Typography component="h5" variant='h5' sx={{ fontWeight: "bold" }} color='primary'>
              Architect
            </Typography>
          </Grid>
          <Grid item>
            <Typography>Picasso</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Grid item>
            <Typography component="h5" variant='h5' sx={{ fontWeight: "bold" }} color='primary'>
              Year Built
            </Typography>
          </Grid>
          <Grid item>
            <Typography>1967</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{margin: 5}} role='presentation'/>
      <Grid
        container
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
      >
        <Grid item>
          <Typography component="h5" variant='h5' sx={{ fontWeight: "bold" }} color='primary'>
            Description
          </Typography>
        </Grid>
        <Grid item padding={5} paddingTop={0}>
          <Typography component="p" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non leo
            a lacus lacinia pulvinar id ut ligula. Cras bibendum tellus
            accumsan, venenatis massa id, posuere velit. Suspendisse auctor leo
            non justo elementum viverra. Etiam a convallis ipsum, non ultricies
            ex. Integer ligula urna, feugiat lacinia purus posuere, tempor
            finibus mauris. Nam sit amet aliquam felis. Nunc ultrices nec diam
            quis malesuada. Suspendisse non metus diam. Ut feugiat, lacus sit
            amet facilisis placerat, metus nulla vulputate nunc, et pretium
            augue nunc vel odio. Pellentesque mollis quam ex, vel porttitor
            nulla maximus et. Vestibulum quis accumsan sapien. Aliquam mattis
            nunc aliquam hendrerit pulvinar. Aliquam ut accumsan erat. Aenean ac
            est lacus. Nam neque urna, ullamcorper vel pellentesque sed,
            ullamcorper eget ex. Vestibulum rutrum vel est eu sagittis. Etiam
            elementum sagittis mauris et rhoncus. Vivamus auctor aliquet justo
            sed faucibus. Donec id odio vel odio posuere rutrum. Maecenas
            faucibus malesuada turpis fermentum sodales. Nam tincidunt neque
            eget rhoncus posuere. Aenean tellus ligula, rutrum et volutpat
            vitae, consectetur efficitur est. Cras a quam id ipsum elementum
            pellentesque ut eu felis.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
