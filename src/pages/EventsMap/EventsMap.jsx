// EventsMap.jsx
import React, { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import useFetchLocations from '../../Hooks/useFetchLocations';
import MapContainer from '../../components/MapContainer/MapContainer';
import MarkersLayer from '../../components/MarkersLayer/MarkersLayer';
import Toolbar from '../../components/Toolbar/Toolbar';
import PopupManager from '../../components/PopupManager/PopupManager';
import { eventsReducer, INITIAL_STATE } from '../../utils/reducer';
import { setMap } from '../../utils/actions';
import useFavoritesManager from '../../Hooks/useFavoritesManager';
import { usePopup } from '../../context/PopupContext';
import Filters from '../../components/Filters/Filters';
import UpcomingEventsModal from '../../components/UpcomingEventsModal/UpcomingEventsModal';


// const EventsMap = () => {
//   const locations = useFetchLocations();  
//   const [state, dispatch] = useReducer(eventsReducer, INITIAL_STATE);
//   const mapLoadRef = useRef(false);
//   const { popupInfo } = usePopup();
//   const [filteredLocations, setFilteredLocations] = useState(locations);
  

//   const { handleToggleFavorite, isEventFavorited } = useFavoritesManager({
//     map: state.map,
//     favorites: state.favorites,
//     setFavorites: (favorites) => dispatch({ type: 'SET_FAVORITES', payload: favorites }),
//     locations
//   });

//   const memoizedLocations = useMemo(() => filteredLocations, [filteredLocations]);
  
//   const memoizedFavorites = useMemo(() => {
//     return state.favorites; 
//   }, [state.favorites]);
  

//   const handleMapLoad = useCallback((mapInstance) => {
//     if (!mapLoadRef.current) {
//       setMap(dispatch, mapInstance);
//       mapLoadRef.current = true;
//     }
//   }, [dispatch]);

//  // Ajuste en `handleToggleMarkers` para restaurar todos los eventos
//  const handleToggleMarkers = useCallback(() => {
//   if (state.showFavorites) {
//     dispatch({ type: 'TOGGLE_FAVORITES_VISIBILITY' });
//   }
//   dispatch({ type: 'TOGGLE_MARKERS' });
//   setFilteredLocations(locations); // Restaura todos los eventos al mostrar marcadores
// }, [state.showFavorites, dispatch, locations]);



//   const handleToggleFavoritesVisibility = useCallback(() => {
//     if (state.showMarkers) {
//       dispatch({ type: 'TOGGLE_MARKERS' });
//     }
//     dispatch({ type: 'TOGGLE_FAVORITES_VISIBILITY' });
//   }, [state.showMarkers, dispatch]);

//   console.log("EventsMap component render");

//   // Nueva función para aplicar los filtros
//   const handleFilterChange = ({ name, date, genre, segment, subGenre }) => {
//   // Función para normalizar y eliminar las tildes
//   const normalizeString = (str) => {
//     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
//   };

//   const filtered = locations.filter(event => {
//     // Normaliza tanto el nombre del evento como el nombre de búsqueda
//     const matchesName = new RegExp(normalizeString(name), 'i').test(normalizeString(event.name));
//     const matchesDate = !date || new Date(event.startDate).toISOString().split('T')[0] === date;
//     const matchesGenre = !genre || event.classificationName === genre;
//     const matchesSegment = !segment || event.segment?.name === segment;
//     const matchesSubGenre = !subGenre || event.subGenre?.name === subGenre;

//     return matchesName && matchesDate && matchesGenre && matchesSegment && matchesSubGenre;
//   });

//   setFilteredLocations(filtered);
// };


//   return (
//     <>
//     <Filters onFilterChange={handleFilterChange} />
//       <MapContainer
//         onMapLoad={handleMapLoad}
//         locations={memoizedLocations}
//         showMarkers={state.showMarkers || state.showFavorites}
//         />
//         {/* <Calendar onDateSelect={handleDateSelect}/> */}
//       {state.map && (state.showMarkers || state.showFavorites) && (
//         <MarkersLayer
//           map={state.map}
//           locations={state.showFavorites ? memoizedFavorites : memoizedLocations}
//           showMarkers={state.showMarkers || state.showFavorites}
//         />
//       )}
//       {popupInfo && (
//         <PopupManager
//           handleToggleFavorite={handleToggleFavorite}
//           isEventFavorited={isEventFavorited}
//         />
//       )}
//       <Toolbar
//         onToggleMarkers={handleToggleMarkers}
//         onToggleFavorites={handleToggleFavoritesVisibility}
//         hasFavorites={state.favorites.length > 0}
//       />
//     </>
//   );
// };

// export default React.memo(EventsMap);

const EventsMap = () => {
  const locations = useFetchLocations();  
  const [state, dispatch] = useReducer(eventsReducer, INITIAL_STATE);
  const mapLoadRef = useRef(false);
  const { popupInfo } = usePopup();
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [focusedEventId, setFocusedEventId] = useState(null);

  const genres = useMemo(() => {
    return [...new Set(locations.map(event => event.genreName).filter(Boolean))];
  }, [locations]);
  
  const segments = useMemo(() => {
    const segmentList = locations.map(event => event.classificationName).filter(Boolean);
    // console.log("Segmentos procesados:", segmentList); // Verifica los segmentos
    return [...new Set(segmentList)];
  }, [locations]);
  
  const subGenres = useMemo(() => {
    const subGenreList = locations.map(event => event.subGenreName).filter(Boolean);
    // console.log("Subgéneros procesados:", subGenreList); // Verifica los subgéneros
    return [...new Set(subGenreList)];
  }, [locations]);
  
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const { handleToggleFavorite, isEventFavorited } = useFavoritesManager({
    map: state.map,
    favorites: state.favorites,
    setFavorites: (favorites) => dispatch({ type: 'SET_FAVORITES', payload: favorites }),
    locations
  });

  const memoizedLocations = useMemo(() => filteredLocations, [filteredLocations]);
  
  const memoizedFavorites = useMemo(() => state.favorites, [state.favorites]);

  const sortedUpcomingEvents = useMemo(() => {
    const sortedEvents = [...(locations || [])]
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .filter(event => new Date(event.startDate) >= new Date());
      
    // console.log("Fechas de eventos ordenadas:", sortedEvents.map(event => event.startDate)); // Muestra las fechas ordenadas
    return sortedEvents;
  }, [locations]);
  
  const handleMapLoad = useCallback((mapInstance) => {
    if (!mapLoadRef.current) {
      setMap(dispatch, mapInstance);
      mapLoadRef.current = true;
    }
  }, [dispatch]);

  // const handleToggleMarkers = useCallback(() => {
  //   if (state.showFavorites) {
  //     dispatch({ type: 'TOGGLE_FAVORITES_VISIBILITY' });
  //   }
  //   dispatch({ type: 'TOGGLE_MARKERS' });
  //   setFilteredLocations(locations);
  // }, [state.showFavorites, dispatch, locations]);
  

  const handleToggleMarkers = useCallback((eventId = null) => {
    setFocusedEventId(eventId); // Actualiza el evento enfocado

    if (eventId && state.map) {
      const selectedEvent = locations.find(event => event.id === eventId);
      if (selectedEvent) {
        // Centra el mapa en el evento seleccionado
        state.map.flyTo({
          center: selectedEvent.coordinates,
          zoom: 15,
          speed: 1.2,
        });
      }
    } else {
      // Restaura todos los eventos cuando se selecciona `null`
      if (state.showFavorites) {
        dispatch({ type: 'TOGGLE_FAVORITES_VISIBILITY' });
      }
      dispatch({ type: 'TOGGLE_MARKERS' });
      setFilteredLocations(locations);
    }
  }, [locations, state.map, state.showFavorites, dispatch]);



  const handleToggleFavoritesVisibility = useCallback(() => {
    if (state.showMarkers) {
      dispatch({ type: 'TOGGLE_MARKERS' });
    }
    dispatch({ type: 'TOGGLE_FAVORITES_VISIBILITY' });
  }, [state.showMarkers, dispatch]);

  const handleFilterChange = ({ name, date, genre, segment, subGenre }) => {
    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  
    const filtered = locations.filter(event => {
      const matchesName = new RegExp(normalizeString(name), 'i').test(normalizeString(event.name));
      const matchesDate = !date || new Date(event.startDate).toISOString().split('T')[0] === date;
      const matchesGenre = !genre || event.classificationName === genre;
      const matchesSegment = !segment || event.segment?.name === segment;
      const matchesSubGenre = !subGenre || event.subGenre?.name === subGenre;
  
      return matchesName && matchesDate && matchesGenre && matchesSegment && matchesSubGenre;
    });
  
    setFilteredLocations(filtered);
  };

  return (
    <>
      <Filters
        onFilterChange={handleFilterChange}
        genres={genres}
        segments={segments}
        subGenres={subGenres}
      />
      <MapContainer
        onMapLoad={handleMapLoad}
        locations={memoizedLocations}
        showMarkers={state.showMarkers || state.showFavorites}
      />
      {state.map && (state.showMarkers || state.showFavorites) && (
        <MarkersLayer
          map={state.map}
          locations={state.showFavorites ? memoizedFavorites : memoizedLocations}
          showMarkers={state.showMarkers || state.showFavorites}
          focusedEventId={focusedEventId}
        />
      )}
      {popupInfo && (
        <PopupManager
          handleToggleFavorite={handleToggleFavorite}
          isEventFavorited={isEventFavorited}
        />
      )}
      <Toolbar
        onToggleMarkers={handleToggleMarkers}
        onToggleFavorites={handleToggleFavoritesVisibility}
        hasFavorites={state.favorites.length > 0}
      />
       {showUpcomingEvents && (
        <UpcomingEventsModal 
          events={sortedUpcomingEvents}
          onClose={() => setShowUpcomingEvents(false)}
          onMinimize={handleMinimize}
          isMinimized={isMinimized}
          onToggleMarkers={handleToggleMarkers}
        />
      )}
    </>
  );
};

export default React.memo(EventsMap);
