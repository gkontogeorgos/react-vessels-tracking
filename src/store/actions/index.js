
export const ACTION_TYPES = {
  SET_ALL_VESSELS: "SET_ALL_VESSELS",
  SET_SELECTED_VESSEL: "SET_SELECTED_VESSEL",
  SET_IS_FEATURE_VISIBLE: "SET_IS_FEATURE_VISIBLE",
  SET_IS_SEARCH_FORM_VISIBLE: "SET_IS_SEARCH_FORM_VISIBLE",
  SET_FEATURE: "SET_FEATURE",
  SET_VESSEL_ANIMATION: "SET_VESSEL_ANIMATION",
  CLEAR_ALL: "CLEAR_ALL",
};

export const setAllVessels = (payload) => ({
  type: ACTION_TYPES.SET_ALL_VESSELS,
  payload,
});

export const setSelectedVessel = (payload) => ({
  type: ACTION_TYPES.SET_SELECTED_VESSEL,
  payload,
});

export const setIsSearchFormVisible = (payload) => ({
  type: ACTION_TYPES.SET_IS_SEARCH_FORM_VISIBLE,
  payload,
});

export const setIsFeatureVisible = (payload) => ({
  type: ACTION_TYPES.SET_IS_FEATURE_VISIBLE,
  payload,
});

export const setFeature = (payload) => ({
  type: ACTION_TYPES.SET_FEATURE,
  payload,
});

export const setVesselAnimation = (payload) => ({
  type: ACTION_TYPES.SET_VESSEL_ANIMATION,
  payload,
});

export const clearAll = () => ({
  type: ACTION_TYPES.CLEAR_ALL,
});
