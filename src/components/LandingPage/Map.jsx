import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";

const Map = () => {
  const dispatch = useDispatch();
  const { sites } = useSelector((store) => store);
  const center = useMemo(() => ({ lat: 46.7296, lng: -94.6859 }), []);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_SITES" });
  }, []);

  console.log(sites);
  console.log("api key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  return (
    <GoogleMap zoom={6} center={center} mapContainerClassName="map-container">
      Map
    </GoogleMap>
  );
};

export default Map;
