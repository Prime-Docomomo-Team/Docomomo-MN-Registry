import { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
  const sites = useSelector((store) => store.sites);
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  // const center = useMemo(() => ({ lat: 46.7296, lng: -94.6859 }), []);
  // const options = useMemo(() => ({ mapId: "8eb7cad122f99b95" }), []);
  const clustererRef = useRef();
  console.log("Sites with photos: ", sites);

  // No longer needed? Now that we are applying filters to load markers.
  // useEffect(() => {
  //   dispatch({ type: "FETCH_ALL_SITES" });
  // }, []);

  useEffect(() => {
    clustererRef.current?.repaint();
  }, [sites]);

  // For setting map bounds
  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      sites.map((marker) => {
        bounds.extend({
          lat: marker.latitude,
          lng: marker.longitude,
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, sites]);
  const onLoadMap = useCallback((map) => setMap(map), []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  console.log(sites);
  console.log("api key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  return (
    <GoogleMap
      onLoad={onLoadMap}
      // options={{ mapId: "8eb7cad122f99b95" }}
      // zoom={6}
      // center={center}
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

                      <Button
                        onClick={() => {
                          history.push(`/details/${site.id}`);
                          dispatch({ type: "SET_SITES", payload: [] });
                        }}
                      >
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
