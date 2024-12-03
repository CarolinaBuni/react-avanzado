// utils/actions.js

export const setMap = ( dispatch, mapInstance ) => {
     dispatch( { type: "SET_MAP", payload: mapInstance } );
};

export const setFilteredLocations = ( dispatch, locations ) => {
     dispatch( { type: "SET_FILTERED_LOCATIONS", payload: locations } );
};

export const setFocusedEvent = ( dispatch, eventId ) => {
     dispatch( { type: "SET_FOCUSED_EVENT", payload: eventId } );
};

export const toggleMarkersVisibility = ( dispatch ) => {
     dispatch( { type: "TOGGLE_MARKERS" } );
};

export const toggleFavoritesVisibility = ( dispatch ) => {
     dispatch( { type: "TOGGLE_FAVORITES_VISIBILITY" } );
};

export const setFavorites = ( dispatch, favorites ) => {
     dispatch( { type: "SET_FAVORITES", payload: Array.isArray( favorites ) ? favorites : [ favorites ] } );
};

export const showAllEvents = ( dispatch ) => {
     dispatch( { type: "SHOW_ALL_EVENTS" } );
};