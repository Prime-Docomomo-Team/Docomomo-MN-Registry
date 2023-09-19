import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import ImageStepper from "./ImageStepper";
import { useEffect } from "react";

const Details = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const {
    id,
    street,
    city,
    state,
    zip,
    site_name,
    architect,
    year_built,
    description,
  } = useSelector((store) => store.details);
  const photos = useSelector((store) => store.photos);
  console.log(photos);

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: params.id });
    dispatch({ type: "FETCH_PHOTOS", payload: params.id });
  }, []);

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
          <Button
            onClick={() => {
              history.push("/home");
              dispatch({ type: "SET_SITES", payload: [] });
            }}
          >
            BACK
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={5}>
          {photos.length > 0 && <ImageStepper images={photos} />}
        </Grid>
      </Grid>
      <Grid container padding={2} justifyContent="center">
        <Grid item>
          <Typography component="h2" variant="h3" color="primary">
            {site_name}
          </Typography>
          <Divider role="presentation" sx={{ margin: 2 }} />
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
            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              Address
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {street}, {city}, {state}, {zip}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Grid item>
            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              Architect
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{architect}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Grid item>
            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              Year Built
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{year_built}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ margin: 5 }} role="presentation" />
      <Grid
        container
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
      >
        <Grid item>
          <Typography
            component="h5"
            variant="h5"
            sx={{ fontWeight: "bold" }}
            color="primary"
          >
            Description
          </Typography>
        </Grid>
        <Grid item padding={5} paddingTop={0}>
          <Typography component="p">{description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
