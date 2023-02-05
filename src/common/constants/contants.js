import React from "react";
import Search from "@mui/icons-material/Search";
import AnimationIcon from "@mui/icons-material/Animation";
import BackspaceIcon from "@mui/icons-material/Backspace";

export const menuItems = [
  { id: 0, title: "Search & Track Vessel", icon: <Search /> },
  { id: 1, title: "Vessel Route Animation", icon: <AnimationIcon /> },
  { id: 2, title: "Clear All", icon: <BackspaceIcon /> },
];

export const periodOptions = [
  {
    id: 0,
    value: "hourly",
    label: "Hourly",
  },
  {
    id: 1,
    value: "daily",
    label: "Daily",
  },
];

export const vesselOptions = [
  {
    id: 0,
    value: "mmsi",
    label: "mmsi",
  },
  {
    id: 1,
    value: "imo",
    label: "imo",
  },
  {
    id: 2,
    value: "shipid",
    label: "shipid",
  },
];

export const dateOptions = [
  {
    id: 0,
    value: "days",
    label: "Days",
  },
  {
    id: 1,
    value: "date",
    label: "Date",
  },
];
