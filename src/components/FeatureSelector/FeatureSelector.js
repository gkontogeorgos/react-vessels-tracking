import * as React from "react";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import SearchVessel from "components/SearchVessel/SearchVessel";
import AnimatedRoute from "components/AnimatedRoute/AnimatedRoute";
import { connect } from "react-redux";

const FeatureSelector = ({ feature }) => {
  return (
    <>
      {feature?.id === 0 && <SearchVessel />}
      {feature?.id === 1 && <AnimatedRoute />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    feature: state?.feature,
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(FeatureSelector));
