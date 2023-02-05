import * as React from "react";
import { styles } from "./styles";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MenuNavBar from "components/Menu/MenuNavBar";
import { setIsSearchFormVisible, clearAll } from "store/actions";
import { connect } from "react-redux";

const App = ({
  classes,
  isSearchFormVisible,
  setIsSearchFormVisible,
  clearAll,
}) => {
  React.useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);

  return (
    <div>
      <Header
        isSearchFormVisible={isSearchFormVisible}
        setIsSearchFormVisible={setIsSearchFormVisible}
      />
      <div className={classes.container}>
        <Grid container>
          {isSearchFormVisible && (
            <Grid item xs={2} className={classes.mapContainer}>
              <MenuNavBar />
            </Grid>
          )}
          <Grid
            item
            xs={isSearchFormVisible ? 10 : 12}
            className={classes.mapContainer}
          >
            <Map />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSearchFormVisible: state?.isSearchFormVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearAll: (payload) => dispatch(clearAll(payload)),
    setIsSearchFormVisible: (payload) =>
      dispatch(setIsSearchFormVisible(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
