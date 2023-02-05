import * as React from "react";
import { Slider } from "@mui/material";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Input,
  Box,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import { connect } from "react-redux";
import { globalStyles } from "common/styles/globalStyles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";
import { setVesselAnimation } from "store/actions";
import VesselInfo from "common/components/VesselInfo/VesselInfo";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import cn from "classnames";

const AnimatedRoute = ({
  classes,
  selectedVessel,
  vesselAnimation,
  setVesselAnimation,
}) => {
  const [vesselIndex, setVesselIndex] = React.useState(0);
  const timeIdRef = React.useRef();
  const vesselTimePoints = selectedVessel?.data?.map((el) =>
    new Date(el?.TIMESTAMP).getTime()
  );

  const isAnimationEnded = vesselIndex < vesselTimePoints.length - 1;

  React.useEffect(() => {
    if (vesselAnimation?.isInitialized) {
      if (isAnimationEnded) {
        timeIdRef.current = setInterval(
          () => setVesselIndex((i) => (i + 1) % vesselTimePoints.length),
          vesselAnimation.speed * 1000
        );
        return () => clearInterval(timeIdRef.current);
      }
    }
  }, [isAnimationEnded, vesselAnimation, vesselTimePoints]);

  React.useEffect(() => {
    setVesselAnimation({
      ...vesselAnimation,
      step: vesselIndex,
    });
  }, [vesselIndex]);

  const handleAnimationStepSliderChange = (event, val) => {
    setVesselAnimation({ ...vesselAnimation, step: val });
  };

  const handleAnimationStepChange = (event) => {
    setVesselAnimation({
      ...vesselAnimation,
      step: event.target.value === "" ? "" : +event.target.value,
    });
  };

  const onBlurStep = () => {
    if (vesselAnimation?.step < 0) {
      setVesselAnimation({ ...vesselAnimation, step: 0 });
    } else if (vesselAnimation?.step > selectedVessel?.data?.length) {
      setVesselAnimation({
        ...vesselAnimation,
        step: selectedVessel?.data?.length,
      });
    }
  };

  const handleAnimationSpeedSliderChange = (e) => {
    setVesselAnimation({ ...vesselAnimation, speed: e.target.value });
  };

  const handleAnimationSpeedChange = (event) => {
    setVesselAnimation({
      ...vesselAnimation,
      speed: event.target.value === "" ? "" : +event.target.value,
    });
  };

  const onBlurSpeed = () => {
    if (vesselAnimation?.speed < 0) {
      setVesselAnimation({ ...vesselAnimation, speed: 0 });
    } else if (vesselAnimation?.speed > 10) {
      setVesselAnimation({
        ...vesselAnimation,
        speed: 10,
      });
    }
  };

  const onStartAnimation = () => {
    setVesselAnimation({ ...vesselAnimation, isInitialized: true });
  };

  const onPauseAnimation = () => {
    setVesselAnimation({ ...vesselAnimation, isInitialized: false });
  };

  const onReplayAnimation = () => {
    setVesselIndex(0);
    setVesselAnimation({ ...vesselAnimation, isInitialized: true, step: 0 });
  };

  return (
    <Box className={classes.box}>
      <div variant="standard" className={classes.container}>
        <section className={classes.section}>
          <Typography
            id="value-information"
            gutterBottom
            className={classes.title}
          >
            Vessel Details
          </Typography>
          <Card className={classes.card}>
            <VesselInfo
              currentVessel={selectedVessel?.data[vesselAnimation?.step]}
            />
          </Card>
        </section>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {!vesselAnimation?.isInitialized && (
              <Button
                variant="contained"
                className={classes.button}
                endIcon={<PlayArrowIcon className={classes.icon} />}
                onClick={onStartAnimation}
              >
                PLAY
              </Button>
            )}
            {vesselAnimation?.isInitialized && isAnimationEnded && (
              <Button
                variant="contained"
                className={cn(classes.button, classes.pauseButton)}
                endIcon={<PauseIcon className={classes.icon} />}
                onClick={onPauseAnimation}
              >
                PAUSE
              </Button>
            )}
            {vesselAnimation?.isInitialized && !isAnimationEnded && (
              <Button
                variant="contained"
                className={classes.button}
                endIcon={<ReplayIcon className={classes.icon} />}
                onClick={onReplayAnimation}
              >
                REPLAY
              </Button>
            )}
          </Grid>
          <section className={classes.secondarySection}>
            <div className={classes.infoContainer}>
              <Typography
                id="value-information"
                gutterBottom
                className={cn(classes.title, classes.marginTitle)}
              >
                Vessel time tracking
              </Typography>
              <Tooltip title={`Tracks vessel per time point`} arrow>
                <HelpOutlineIcon className={classes.icon} />
              </Tooltip>
            </div>
            <Grid item xs>
              <Slider
                min={0}
                max={selectedVessel?.data?.length - 1}
                value={
                  typeof vesselAnimation.step === "number"
                    ? vesselAnimation.step
                    : 0
                }
                onChange={handleAnimationStepSliderChange}
                valueLabelDisplay="auto"
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                value={vesselAnimation.step}
                size="small"
                onChange={handleAnimationStepChange}
                onBlur={onBlurStep}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: selectedVessel?.data?.length - 1,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </section>
          <section className={classes.secondarySection}>
            <div className={classes.infoContainer}>
              <Typography
                id="value-information"
                gutterBottom
                className={cn(classes.title, classes.marginTitle)}
              >
                Animation Speed
              </Typography>
              <Tooltip
                title={
                  vesselAnimation?.speed === 0
                    ? "Updates vessel route instantly"
                    : vesselAnimation?.speed === 1
                    ? "Updates vessel route every second"
                    : `Updates vessel route every ${vesselAnimation?.speed} seconds`
                }
                arrow
              >
                <HelpOutlineIcon className={classes.icon} />
              </Tooltip>
            </div>
            <Grid item xs>
              <Slider
                min={0}
                max={10}
                value={
                  typeof vesselAnimation?.speed === "number"
                    ? vesselAnimation.speed
                    : 0
                }
                onChange={handleAnimationSpeedSliderChange}
                valueLabelDisplay="auto"
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item xs>
              <Input
                value={vesselAnimation.speed}
                size="small"
                onChange={handleAnimationSpeedChange}
                onBlur={onBlurSpeed}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 10,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </section>
        </Grid>
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedVessel: state.selectedVessel,
    vesselAnimation: state.vesselAnimation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVesselAnimation: (payload) => dispatch(setVesselAnimation(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles((theme) => ({
    ...globalStyles(theme),
    ...styles(theme),
  }))(AnimatedRoute)
);
