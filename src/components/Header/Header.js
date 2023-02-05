import * as React from "react";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MenuOpen from "@mui/icons-material/MenuOpen";
import { setIsSearchFormVisible } from "store/actions";
import { connect } from "react-redux";

const Header = ({
  classes,
  selectedVessel,
  isSearchFormVisible,
  setIsSearchFormVisible,
}) => {
  return (
    <div className={classes.container}>
      <Grid
        container
        style={{ flexWrap: isSearchFormVisible ? "wrap" : "nowrap" }}
      >
        <Grid item xs={isSearchFormVisible && 2} className={classes.menu}>
          <MenuOpen
            className={
              isSearchFormVisible
                ? classes.activeMenuIcon
                : classes.inActiveMenuIcon
            }
            style={{ fontSize: "3rem" }}
            onClick={() => setIsSearchFormVisible(!isSearchFormVisible)}
          />
        </Grid>
        <Grid
          item
          xs={isSearchFormVisible && 10}
          className={classes.header}
          style={{ padding: selectedVessel?.data?.length > 0 ? 15 : 25 }}
        >
          <span>MarineTraffic Vessel Tracking</span>
          {selectedVessel?.data?.length > 0 && (
            <div>SHIP ID: #{selectedVessel.data[0].SHIP_ID}</div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSearchFormVisible: state?.isSearchFormVisible,
    selectedVessel: state?.selectedVessel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsSearchFormVisible: (payload) =>
      dispatch(setIsSearchFormVisible(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
