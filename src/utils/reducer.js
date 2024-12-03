// utils/reducer.js
export const INITIAL_STATE = {
  map: null,
  showMarkers: false,
  favorites: [],
  showFavorites: false,
  filteredLocations: [],
  focusedEventId: null,
};

export const eventsReducer = ( state, action ) => {
  switch ( action.type ) {
    case "SET_MAP":
      return state.map === action.payload ? state : { ...state, map: action.payload };
    case "TOGGLE_MARKERS":
      return { ...state, showMarkers: !state.showMarkers };
    case "TOGGLE_FAVORITES_VISIBILITY":
      return { ...state, showFavorites: !state.showFavorites };
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };
    case "SHOW_ALL_EVENTS":
      return { 
        ...state, 
        showFavorites: false, 
        showMarkers: true,
        filteredLocations: action.payload
      };
    case "SET_FILTERED_LOCATIONS":
      return { ...state, filteredLocations: action.payload };
    case "SET_FOCUSED_EVENT":
      return { ...state, focusedEventId: action.payload };
    default:
      return state;
  }
};