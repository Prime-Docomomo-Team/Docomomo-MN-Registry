import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  GoogleMap,
  MarkerF,
  MarkerClustererF,
  InfoWindowF,
} from "@react-google-maps/api";

// MUI
import { Button, Box, Typography } from "@mui/material";

const Map = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sites } = useSelector((store) => store);
  const [activeMarker, setActiveMarker] = useState(null);
  const center = useMemo(() => ({ lat: 46.7296, lng: -94.6859 }), []);
  const clustererRef = useRef();
  console.log("Sites with photos: ", sites);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_SITES" });
  }, []);

  useEffect(() => {
    clustererRef.current?.repaint();
  }, [sites.length]);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const setDetails = (siteId) => {
    dispatch({ type: "FETCH_DETAILS", payload: siteId });
    dispatch({ type: "FETCH_PHOTOS", payload: siteId });
    history.push("/details");
  };

  console.log(sites);
  console.log("api key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  return (
    <GoogleMap
      zoom={6}
      center={center}
      mapContainerClassName="map-container"
      onClick={() => setActiveMarker(null)}
    >
      {sites && sites.length > 0 && (
        <MarkerClustererF
          onLoad={(clusterer) => (clustererRef.current = clusterer)}
          // onUnmount={(clusterer) => clusterer.clearMarkers()}
        >
          {(clusterer) =>
            sites.map((site) => (
              <MarkerF
                key={site.id}
                position={{ lat: site.latitude, lng: site.longitude }}
                onClick={() => handleActiveMarker(site.id)}
                clusterer={clusterer}
                noClustererRedraw={true}
              >
                {activeMarker === site.id && (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap={1}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        {site.site_name}
                      </Typography>
                      <Typography>
                        {site.street}, {site.city}, {site.state}, {site.zip}
                      </Typography>
                      {site.url_id != null && (
                        <Box
                          component="img"
                          src={`https://drive.google.com/uc?export=view&id=${site.url_id}`}
                          sx={{ height: 100, margin: "auto" }}
                        ></Box>
                      )}

                      <Button onClick={() => setDetails(site.id)}>
                        Read More
                      </Button>
                    </Box>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))
          }
        </MarkerClustererF>
      )}
    </GoogleMap>
  );
};

export default Map;
