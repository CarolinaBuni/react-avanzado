// utils/actions.js

export const setMap = ( dispatch, mapInstance ) => {
     dispatch( { type: "SET_MAP", payload: mapInstance } );
};

export const toggleMarkersVisibility = ( dispatch ) => {
     dispatch( { type: "TOGGLE_MARKERS" } );
};

export const toggleFavoritesVisibility = ( dispatch ) => {
     dispatch( { type: "TOGGLE_FAVORITES_VISIBILITY" } );
};

export const setFavorites = ( dispatch, favorites ) => {
     // console.log("Llamando a setFavorites con:", favorites);
     dispatch( { type: "SET_FAVORITES", payload: Array.isArray( favorites ) ? favorites : [ favorites ] } );
};

export const showAllEvents = (dispatch) => {
     dispatch({ type: "SHOW_ALL_EVENTS" });
 };
 
