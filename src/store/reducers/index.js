import { ACTION_TYPES } from "../actions";
import { INITIAL_STATE } from "../state";

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_VESSELS: {
      return { ...state, vessels: action.payload };
    }
    case ACTION_TYPES.SET_SELECTED_VESSEL: {
      return { ...state, selectedVessel: action.payload };
    }
    case ACTION_TYPES.SET_IS_SEARCH_FORM_VISIBLE: {
      return { ...state, isSearchFormVisible: action.payload };
    }
    case ACTION_TYPES.SET_IS_FEATURE_VISIBLE: {
      return { ...state, isFeatureVisible: action.payload };
    }
    case ACTION_TYPES.SET_FEATURE: {
      return { ...state, feature: action.payload };
    }
    case ACTION_TYPES.SET_VESSEL_ANIMATION: {
      return { ...state, vesselAnimation: action.payload };
    }
    case ACTION_TYPES.CLEAR_ALL: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
