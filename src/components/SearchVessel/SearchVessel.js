import * as React from "react";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Input,
  RadioGroup,
  Radio,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import { Slider } from "@mui/material";

import { setSelectedVessel, setFeature } from "store/actions";
import { connect } from "react-redux";
import { globalStyles } from "common/styles/globalStyles";
import {
  vesselOptions,
  dateOptions,
  periodOptions,
} from "common/constants/contants";
import { DatePicker, Space } from "antd";
import { trackVessel } from "common/services/endpoints";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AnimationIcon from "@mui/icons-material/Animation";
import boat from "common/assets/images/ship.png";
import moment from "moment";
import cn from "classnames";

const SearchVessel = ({
  classes,
  selectedVessel,
  setSelectedVessel,
  setFeature,
}) => {
  const { RangePicker } = DatePicker;

  const handleSliderChange = (event, newValue) => {
    setSelectedVessel({ ...selectedVessel, days: newValue });
  };

  const handleInputChange = (event) => {
    setSelectedVessel({
      ...selectedVessel,
      days: event.target.value === "" ? "" : +event.target.value,
    });
  };

  const handleBlur = () => {
    if (selectedVessel?.days < 0) {
      setSelectedVessel({
        ...selectedVessel,
        days: 0,
      });
    } else if (selectedVessel?.days > 190) {
      setSelectedVessel({
        ...selectedVessel,
        days: 190,
      });
    }
  };

  const onSetSelectedVessel = (e) => {
    setSelectedVessel({ ...selectedVessel, value: e.target.value });
  };

  const handleChangePeriod = (e) => {
    setSelectedVessel({ ...selectedVessel, period: e.target.value });
  };

  const handleChangeVesselOptions = (e) => {
    setSelectedVessel({ ...selectedVessel, option: e.target.value });
  };

  const handleChangeDateOptions = (e) => {
    setSelectedVessel({ ...selectedVessel, dateOption: e.target.value });
  };

  const formattedDate = (date) => {
    return date
      .toISOString()
      .replace("Z", "")
      .replace("T", " ")
      .replace("%", " ")
      .slice(0, -4);
  };

  const onDateChange = (date, dateString) => {
    if (date?.length) {
      const dateFrom = formattedDate(date[0]);
      const dateTo = formattedDate(date[1]);

      setSelectedVessel({
        ...selectedVessel,
        dateFrom,
        dateTo,
        selectedDates: [moment(date[0]), moment(date[1])],
      });
    } else {
      setSelectedVessel({
        ...selectedVessel,
        dateFrom: null,
        dateTo: null,
        selectedDates: [],
      });
    }
  };

  const onRedirectToAnimation = () => {
    setFeature({ id: 1, title: "Vessel Route Animation" });
  };

  const onSearchVessel = () => {
    trackVessel(
      selectedVessel?.period,
      selectedVessel?.dateOption,
      selectedVessel?.days,
      selectedVessel?.dateFrom,
      selectedVessel?.dateTo,
      selectedVessel?.option,
      selectedVessel?.value
    )
      .then(({ data }) => {
        setSelectedVessel({
          ...selectedVessel,
          data,
          error: null,
        });
      })
      .catch((error) => {
        setSelectedVessel({
          ...selectedVessel,
          error,
        });
      });
  };

  const disabledDate = (current) => {
    return !!current && current > moment.now();
  };

  const isSearchButtonDisabled = !(
    selectedVessel?.value &&
    (selectedVessel?.days || selectedVessel?.period)
  );

  return (
    <Box className={classes.box}>
      <div variant="standard" className={classes.container}>
        <section className={classes.section}>
          <Typography
            id="vessel-information"
            gutterBottom
            className={classes.title}
          >
            Vessel information *
          </Typography>
          <RadioGroup
            name="vesselOptions"
            value={selectedVessel?.option}
            onChange={handleChangeVesselOptions}
            row
          >
            {vesselOptions.map(({ id, value, label }) => {
              return (
                <FormControlLabel
                  key={id}
                  value={value}
                  control={<Radio style={{ color: "rgb(0, 157, 255" }} />}
                  label={label}
                />
              );
            })}
          </RadioGroup>
          <TextField
            type="number"
            value={selectedVessel?.value}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              startAdornment: <img src={boat} width={25} height={25} alt="" />,
              inputProps: {
                max: 100,
                min: 10,
              },
              classes: {
                input: classes.input,
              },
            }}
            className={classes.textField}
            placeholder="Enter mmsi/imo/shipid"
            onChange={onSetSelectedVessel}
          />
        </section>
        <section className={classes.section}>
          <Typography id="period-time" gutterBottom className={classes.title}>
            Period Time *
          </Typography>
          <RadioGroup
            name="dateOptions"
            value={selectedVessel?.dateOption}
            onChange={handleChangeDateOptions}
            row
          >
            {dateOptions.map(({ id, value, label }) => {
              return (
                <FormControlLabel
                  key={id}
                  value={value}
                  control={<Radio style={{ color: "rgb(0, 157, 255" }} />}
                  label={label}
                />
              );
            })}
          </RadioGroup>
          {selectedVessel?.dateOption === "days" && (
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.daysContainer}
            >
              <Grid item>
                <DateRangeIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  min={1}
                  max={190}
                  value={
                    typeof selectedVessel?.days === "number"
                      ? selectedVessel?.days
                      : 0
                  }
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  value={selectedVessel?.days}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 190,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          )}
          {selectedVessel?.dateOption === "date" && (
            <Space
              direction="vertical"
              size={12}
              className={classes.datepicker}
            >
              <RangePicker
                placeholder={["From", "To"]}
                disabledDate={disabledDate}
                onChange={onDateChange}
                format="YYYY/MM/DD hh:mm:ss"
                showTime
              />
            </Space>
          )}
        </section>
        <section className={classes.section}>
          <Typography id="period" gutterBottom className={classes.title}>
            Period
          </Typography>
          <RadioGroup
            name="period"
            value={selectedVessel?.period}
            onChange={handleChangePeriod}
            row
          >
            {periodOptions.map(({ id, value, label }) => {
              return (
                <FormControlLabel
                  key={id}
                  value={value}
                  control={<Radio style={{ color: "rgb(0, 157, 255" }} />}
                  label={label}
                />
              );
            })}
          </RadioGroup>
        </section>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          className={cn(classes.button, classes.searchButton)}
          disabled={isSearchButtonDisabled}
          onClick={onSearchVessel}
        >
          Search
        </Button>
        {selectedVessel?.data?.length === 0 && (
          <Typography
            id="no-results"
            gutterBottom
            className={cn(classes.title, classes.noResults)}
          >
            No results found!
          </Typography>
        )}
        {!!selectedVessel?.error && (
          <div className={classes.error}>{selectedVessel?.error?.message}</div>
        )}
        {!isSearchButtonDisabled && selectedVessel?.data?.length > 1 && (
          <div
            className={classes.animationItemFlex}
            onClick={onRedirectToAnimation}
          >
            <div className={classes.animationLink}>
              <AnimationIcon className={classes.animationIcon} />
            </div>
            <span className={classes.animationActionLabel}>
              Go to Animation!
            </span>
          </div>
        )}
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedVessel: state?.selectedVessel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedVessel: (payload) => dispatch(setSelectedVessel(payload)),
    setFeature: (payload) => dispatch(setFeature(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles((theme) => ({
    ...globalStyles(theme),
    ...styles(theme),
  }))(SearchVessel)
);
