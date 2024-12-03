// useEventsState.js

import { useMemo } from 'react';

export const useEventsState = ( locations ) => {
     // Clasificaciones de eventos
     const genres = useMemo( () => {
          return [ ...new Set( locations.map( event => event.genreName ).filter( Boolean ) ) ];
     }, [ locations ] );

     const segments = useMemo( () => {
          const segmentList = locations.map( event => event.classificationName ).filter( Boolean );
          return [ ...new Set( segmentList ) ];
     }, [ locations ] );

     const subGenres = useMemo( () => {
          const subGenreList = locations.map( event => event.subGenreName ).filter( Boolean );
          return [ ...new Set( subGenreList ) ];
     }, [ locations ] );

     // Eventos ordenados
     const sortedUpcomingEvents = useMemo( () => {
          const sortedEvents = [ ...( locations || [] ) ]
               .sort( ( a, b ) => new Date( a.startDate ) - new Date( b.startDate ) )
               .filter( event => new Date( event.startDate ) >= new Date() );

          return sortedEvents;
     }, [ locations ] );

     return {
          genres,
          segments,
          subGenres,
          sortedUpcomingEvents
     };
};