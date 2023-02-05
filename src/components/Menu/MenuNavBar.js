import React from "react";
import { connect } from "react-redux";
import { setIsFeatureVisible } from "../../store/actions";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { globalStyles } from "common/styles/globalStyles";
import { menuItems } from "common/constants/contants";
import { Button } from "@material-ui/core";
import MenuItem from "./MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FeatureSelector from "components/FeatureSelector/FeatureSelector";
import cn from "classnames";

const MenuNavBar = ({ classes, isFeatureVisible, setIsFeatureVisible }) => {
  return (
    <div>
      {!isFeatureVisible &&
        menuItems?.length > 0 &&
        menuItems.map((item) => {
          return <MenuItem key={item.id} item={item} />;
        })}
      {isFeatureVisible && (
        <>
          <FeatureSelector />
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            className={cn(classes.button, classes.backButtonPosition)}
            onClick={() => setIsFeatureVisible(false)}
          >
            BACK
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFeatureVisible: state?.isFeatureVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsFeatureVisible: (payload) => dispatch(setIsFeatureVisible(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles((theme) => ({
    ...globalStyles(theme),
    ...styles(theme),
  }))(MenuNavBar)
);
