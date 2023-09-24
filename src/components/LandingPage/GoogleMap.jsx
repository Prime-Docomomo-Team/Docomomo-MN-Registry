import { useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMapProvider } from "@ubilabs/google-maps-react-hooks";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import SuperClusterAlgorithm from "./superClusterAlgorithm";
import ReactDOMServer from "react-dom/server";
import { Button, Box, Typography } from "@mui/material";
import { ReactDOM } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './GoogleMap.css'

const GoogleMap = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sites = useSelector((store) => store.sites);
  const [mapContainer, setMapContainer] = useState(null);
  const [markerCluster, setMarkerCluster] = useState(null);
  const [map, setMap] = useState(null);

  const mapOptions = useMemo(
    () => ({
      zoom: 6,
      mapId: "8eb7cad122f99b95",
    }),
    []
  );

  const onLoad = useCallback(
    (map) => {
      addMarkers(map);
      setMap(map);
    },
    [sites]
  );

  useEffect(() => {
    console.log("markerCLuster", markerCluster);
    console.log("map", map);
    if (map && markerCluster) {
      addMarkers(map);
    }
  }, [sites]);

  const addMarkers = (map) => {
    if (markerCluster) {
      markerCluster.clearMarkers();
    }
    const infoWindow = new google.maps.InfoWindow();
    const bounds = new google.maps.LatLngBounds();

    const markers = sites.map((site) => {
      const marker = new google.maps.Marker({
        position: { lat: site.latitude, lng: site.longitude },
      });

      bounds.extend({ lat: site.latitude, lng: site.longitude });
      map.fitBounds(bounds);

      marker.addListener("click", () => {
        const infoWindowContent = (
          <div class='info-window-container'>
            <h5 id='site-name'>{site.site_name}</h5>
            <p id='site-address'>
              {site.street}, {site.city}, {site.state}, {site.zip}
            </p>
            {site.url_id != null && (
              <img
                src={`https://drive.google.com/uc?export=view&id=${site.url_id}`}
                style={{ height: 100, margin: "auto" }}
                id='site-image'
              ></img>
            )}

            <a href={`../#/details/${site.id}`} id='details-link'>Read More</a>
          </div>
        );

        infoWindow.setPosition({ lat: site.latitude, lng: site.longitude });
        infoWindow.setContent(ReactDOMServer.renderToString(infoWindowContent));
        infoWindow.open({ map });
      });

      return marker;
    });

    const newMarkerCluster = new MarkerClusterer({
      markers,
      map,
      algorithm: new SuperClusterAlgorithm({ radius: 100 }),
    });

    setMarkerCluster(newMarkerCluster);
  };

  return sites && sites.length > 0 ? (
    <GoogleMapProvider
      googleMapsAPIKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      options={mapOptions}
      mapContainer={mapContainer}
      onLoad={onLoad}
    >
      <div className="map-container" ref={(node) => setMapContainer(node)} />
    </GoogleMapProvider>
  ) : (
    <div className="map-container"></div>
  );
};

// function addMarkers(map, sites) {
//   const markers = sites.map((site) => {
//     const marker = new google.maps.Marker({
//       position: { lat: site.latitude, lng: site.longitude },
//     });

//     return marker;
//   });

//   new MarkerClusterer({
//     markers,
//     map,
//     algorithm: new SuperClusterAlgorithm({ radius: 100 }),
//   });
// }

export default GoogleMap;
