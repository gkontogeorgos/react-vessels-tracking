import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  Polyline,
  useMap,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import { connect } from "react-redux";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { globalStyles } from "common/styles/globalStyles";
import boat from "common/assets/images/boat.png";
import VesselInfo from "common/components/VesselInfo/VesselInfo";

const Map = ({ classes, selectedVessel, vesselAnimation }) => {
  const boatIcon = L.icon({
    iconUrl: boat,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28],
  });

  const ChangedView = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lng) map.setView([lat, lng]);
    }, [lat, lng, map]);
    return null;
  };

  const vesselCoords = selectedVessel?.data?.map((el) => [el.LAT, el.LON]);

  return (
    <div className={classes.container}>
      <MapContainer
        style={{ height: "100%" }}
        center={[37.98381, 23.727539]}
        zoom={10}
        scrollWheelZoom
        zoomControl={false}
        minZoom={3}
        maxZoom={18}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.1}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl
          zoomInTitle="Click to zoom in"
          zoomOutTitle="Click to zoom out"
          position="topright"
        />
        {selectedVessel?.data?.length > 0 &&
          !!selectedVessel?.data[vesselAnimation?.step] &&
          vesselCoords?.length > 0 && (
            <>
              <Polyline
                stroke
                positions={vesselCoords}
                weight="4"
                dashArray="7"
                color="red"
              />
              <Marker
                position={{
                  lat: selectedVessel?.data[vesselAnimation?.step]?.LAT,
                  lng: selectedVessel?.data[vesselAnimation?.step]?.LON,
                }}
                icon={boatIcon}
              >
                <Tooltip>
                  <VesselInfo
                    currentVessel={selectedVessel?.data[vesselAnimation?.step]}
                  />
                </Tooltip>
              </Marker>
              <ChangedView
                lat={selectedVessel?.data[vesselAnimation?.step]?.LAT}
                lng={selectedVessel?.data[vesselAnimation?.step]?.LON}
              />
            </>
          )}
      </MapContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedVessel: state?.selectedVessel,
    vesselAnimation: state?.vesselAnimation,
  };
};

export default connect(
  mapStateToProps,
  null
)(
  withStyles((theme) => ({
    ...globalStyles(theme),
    ...styles(theme),
  }))(Map)
);
