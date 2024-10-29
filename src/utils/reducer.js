// utils/reducer.js
// export const INITIAL_STATE = {
//      map: null,
//      showMarkers: false,
//      favorites: [],
//      showFavorites: false,
// };

// export const eventsReducer = ( state, action ) => {
//      switch ( action.type ) {
//           case "SET_MAP":
//                return { ...state, map: action.payload };
//           case "TOGGLE_MARKERS":
//                return { ...state, showMarkers: !state.showMarkers };
//           case "TOGGLE_FAVORITES_VISIBILITY":
//                return { ...state, showFavorites: !state.showFavorites };
//           case "SET_FAVORITES":
//                return {
//                     ...state, 
//                     favorites: Array.isArray(action.payload) ? action.payload : [...state.favorites, action.payload] // Siempre un array
//                 };
//           default:
//                return state;
//      }
// };

// utils/reducer.js
export const INITIAL_STATE = {
     map: null,
     showMarkers: false,
     favorites: [],
     showFavorites: false,
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
               const newFavorites = Array.isArray(action.payload) ? action.payload : [...state.favorites, action.payload];
               return state.favorites === newFavorites ? state : { ...state, favorites: newFavorites };
          default:
               return state;
     }
};
