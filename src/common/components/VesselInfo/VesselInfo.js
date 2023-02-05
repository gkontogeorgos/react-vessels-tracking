import * as React from "react";
import { connect } from "react-redux";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { globalStyles } from "common/styles/globalStyles";
import { Typography } from "@material-ui/core";
import moment from "moment";

const VesselInfo = ({ classes, currentVessel }) => {
  const date = new Date(currentVessel?.TIMESTAMP);
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const formattedTime = moment(date).format("HH:mm:ss");

  return (
    <div>
      <Typography>
        <span className={classes.title}>MMSI:</span> {currentVessel?.MMSI}
      </Typography>
      <Typography>
        <span className={classes.title}>IMO:</span> {currentVessel?.IMO}
      </Typography>
      <Typography>
        <span className={classes.title}>SPEED:</span> {currentVessel?.SPEED}{" "}
        km/hr
      </Typography>
      <Typography>
        <span className={classes.title}>DATE:</span> {formattedDate}
      </Typography>
      <Typography>
        <span className={classes.title}>TIME:</span> {formattedTime}
      </Typography>
      <Typography>
        <span className={classes.title}>LONGITUDE:</span> {currentVessel?.LON}
      </Typography>
      <Typography>
        <span className={classes.title}>LATITUDE:</span> {currentVessel?.LAT}
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFeatureVisible: state.isFeatureVisible,
  };
};

export default connect(
  mapStateToProps,
  null
)(
  withStyles((theme) => ({
    ...globalStyles(theme),
    ...styles(theme),
  }))(VesselInfo)
);
