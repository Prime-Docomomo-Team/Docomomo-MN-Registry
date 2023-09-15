import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  GoogleMap,
  MarkerF,
  MarkerClustererF,
  InfoWindowF,
} from "@react-google-maps/api";

// MUI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Map = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sites } = useSelector((store) => store);
  const [activeMarker, setActiveMarker] = useState(null);
  const center = useMemo(() => ({ lat: 46.7296, lng: -94.6859 }), []);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_SITES" });
  }, []);

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
      zoom={6}
      center={center}
      mapContainerClassName="map-container"
      onClick={() => setActiveMarker(null)}
    >
      {sites && sites.length > 0 && (
        <MarkerClustererF onUnmount={(clusterer) => clusterer.clearMarkers()}>
          {(clusterer) =>
            sites.map((site) => (
              <MarkerF
                key={site.id}
                position={{ lat: site.latitude, lng: site.longitude }}
                onClick={() => handleActiveMarker(site.id)}
                clusterer={clusterer}
              >
                {activeMarker === site.id && (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <Typography>{site.site_name}</Typography>
                      <Button
                        onClick={() => {
                          history.push(`/details/${site.id}`);
                        }}
                      >
                        Read More
                      </Button>
                    </div>
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
