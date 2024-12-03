// useUIEventHandlers.js

import { useCallback } from 'react';
import { setMap } from '../utils/actions';

export const useUIEventHandlers = ( state, dispatch, locations, mapLoadRef ) => {
     const handleMapLoad = useCallback( ( mapInstance ) => {
          if ( !mapLoadRef.current ) {
               setMap( dispatch, mapInstance );
               mapLoadRef.current = true;

          }
     }, [ dispatch ] );

     const handleToggleMarkers = useCallback( ( eventId = null ) => {

          if ( eventId !== null ) {
               const eventIdStr = String( eventId );
               dispatch( { type: "SET_FOCUSED_EVENT", payload: eventIdStr } );

               if ( state.map ) {
                    const selectedEvent = locations.find( event => String( event.id ) === eventIdStr );
                    if ( selectedEvent ) {

                         state.map.flyTo( {
                              center: selectedEvent.coordinates,
                              zoom: 15,
                              speed: 1.2,
                              pitch: 45
                         } );
                    }
               }
          } else {
               dispatch( { type: 'TOGGLE_MARKERS' } );
               if ( !state.showMarkers ) {
                    dispatch( { type: 'SHOW_ALL_EVENTS', payload: locations } );
               }
               dispatch( { type: 'SET_FOCUSED_EVENT', payload: null } );
          }
     }, [ locations, state.map, state.showMarkers ] );

     const handleToggleFavoritesVisibility = useCallback( () => {
          if ( state.showMarkers ) {
               dispatch( { type: 'TOGGLE_MARKERS' } );
          }
          dispatch( { type: 'TOGGLE_FAVORITES_VISIBILITY' } );
     }, [ state.showMarkers, dispatch ] );

     const handleFilterChange = ( { name, date, genre, segment, subGenre } ) => {
          const normalizeString = ( str ) =>
               str ? str.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' ).toLowerCase() : '';

          const filtered = locations.filter( ( event ) => {
               const matchesName = new RegExp( normalizeString( name ), 'i' ).test( normalizeString( event.name ) );
               const matchesDate = !date || new Date( event.startDate ).toISOString().split( 'T' )[ 0 ] === date;
               const matchesGenre = !genre || event.classificationName === genre;
               const matchesSegment = !segment || event.segment?.name === segment;
               const matchesSubGenre = !subGenre || event.subGenre?.name === subGenre;

               return matchesName && matchesDate && matchesGenre && matchesSegment && matchesSubGenre;
          } );

          dispatch( { type: 'TOGGLE_MARKERS', payload: true } );
          dispatch( { type: 'SET_FILTERED_LOCATIONS', payload: filtered } );
     };

     return {
          handleMapLoad,
          handleToggleMarkers,
          handleToggleFavoritesVisibility,
          handleFilterChange
     };
};