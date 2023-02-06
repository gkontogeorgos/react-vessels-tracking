import * as React from "react";
import { connect } from "react-redux";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import {
  setIsFeatureVisible,
  setFeature,
  setSelectedVessel,
  setVesselAnimation,
} from "../../store/actions";
import { INITIAL_STATE } from "store/state";

const MenuItem = ({
  classes,
  item,
  selectedVessel,
  setIsFeatureVisible,
  setFeature,
  setSelectedVessel,
  setVesselAnimation,
}) => {
  const showFeature = () => {
    if (item.id !== 2) {
      setIsFeatureVisible(true);
    } else {
      setIsFeatureVisible(false);
      setSelectedVessel(INITIAL_STATE.selectedVessel);
      setVesselAnimation(INITIAL_STATE.vesselAnimation);
    }
    setFeature({ id: item?.id, title: item?.title });
  };

  const isMenuItemDisabled =
    item?.id === 1 &&
    (!selectedVessel?.data?.length || selectedVessel?.data?.length === 1);

  return (
    <Button
      className={classes.menuItem}
      style={{ background: isMenuItemDisabled && "#dddddd" }}
      disabled={isMenuItemDisabled}
      endIcon={item?.icon}
      onClick={showFeature}
    >
      {item?.title}
    </Button>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedVessel: state.selectedVessel,
    isFeatureVisible: state.isFeatureVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsFeatureVisible: (payload) => dispatch(setIsFeatureVisible(payload)),
    setSelectedVessel: (payload) => dispatch(setSelectedVessel(payload)),
    setVesselAnimation: (payload) => dispatch(setVesselAnimation(payload)),
    setFeature: (payload) => dispatch(setFeature(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MenuItem));
