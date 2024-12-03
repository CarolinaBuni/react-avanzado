// EventsMap.jsx

// Imports
import React, { useMemo, useReducer, useRef, useState, useEffect } from 'react';
// import useFetchLocations from '../../Hooks/useFetchLocations';
import MapContainer from '../../components/MapContainer/MapContainer';
import MarkersLayer from '../../components/MarkersLayer/MarkersLayer';
import Toolbar from '../../components/Toolbar/Toolbar';
import PopupManager from '../../components/PopupManager/PopupManager';
import { eventsReducer, INITIAL_STATE } from '../../utils/reducer';
import useFavoritesManager from '../../Hooks/useFavoritesManager';
import { usePopup } from '../../context/PopupContext';
import Filters from '../../components/Filters/Filters';
import UpcomingEventsModal from '../../components/UpcomingEventsModal/UpcomingEventsModal';
import './EventsMap.css';
import Theme from '../../components/Theme/Theme';
import { useTheme } from '../../hooks/useTheme';
import { useEventsState } from '../../hooks/useEventsState';
import { useUIEventHandlers } from '../../Hooks/useUIEventHandler';
import { useLocations } from '../../context/LocationsContext';


const EventsMap = () => {
  // const locations = useFetchLocations();
  const { locations } = useLocations(); 
  const [state, dispatch] = useReducer(eventsReducer, {
    ...INITIAL_STATE,
    filteredLocations: []
  });
  const mapLoadRef = useRef(false);
  const { popupInfo } = usePopup();
  
  // Solo estados de UI
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mapStyle, toggleMapStyle] = useTheme('mapbox://styles/carousinha/cm42ryp6b00wa01sdbeg7gedb');

  // Usar nuestro nuevo custom hook
  const { 
    genres, 
    segments, 
    subGenres, 
    sortedUpcomingEvents 
  } = useEventsState(locations || []);

  const {
    handleMapLoad,
    handleToggleMarkers,
    handleToggleFavoritesVisibility,
    handleFilterChange
  } = useUIEventHandlers(state, dispatch, locations, mapLoadRef);

  

  // Usar el estado del reducer
  const { filteredLocations, focusedEventId } = state;


  const handleMinimize = () => {
    setIsMinimized( !isMinimized );
  };

  const { handleToggleFavorite, isEventFavorited } = useFavoritesManager( {
    map: state.map,
    favorites: state.favorites,
    setFavorites: ( favorites ) => dispatch( { type: 'SET_FAVORITES', payload: favorites } ),
    locations
  } );

  const memoizedLocations = useMemo( () => filteredLocations, [ filteredLocations ] );
  const memoizedFavorites = useMemo( () => state.favorites, [ state.favorites ] );


  // const handleMapLoad = useCallback( ( mapInstance ) => {
  //   if ( !mapLoadRef.current ) {
  //     setMap( dispatch, mapInstance );
  //     mapLoadRef.current = true;
  //   }
  // }, [ dispatch ] );

  const handleShowAllEvents = () => {
    console.log("Button clicked: Loading all events...");
    // const locationsFromAPI = useFetchLocations();
    dispatch( { type: "SHOW_ALL_EVENTS", payload: locations } );
    // setFilteredLocations( locations ); // Resetea filteredLocations a la lista completa
  };


  // Actualización de filteredLocations cuando locations cambian
  useEffect( () => {
    dispatch({ type: 'SET_FILTERED_LOCATIONS', payload: locations });
  }, [ locations ] );

  // Incluir el evento enfocado en las markersLocations si está definido y no está en filteredLocations
  const markersLocations = useMemo( () => {
    if ( focusedEventId ) {
      const focusedEvent = locations.find( event => String( event.id ) === focusedEventId );
      if ( focusedEvent && !filteredLocations.find( event => String( event.id ) === focusedEventId ) ) {
        return [ ...filteredLocations, focusedEvent ];
      }
    }
    return filteredLocations;
  }, [ filteredLocations, focusedEventId, locations ] );

  return (
    <>
      <Filters
        onFilterChange={ handleFilterChange }
        genres={ genres }
        segments={ segments }
        subGenres={ subGenres }
      />
      <Theme toggleMapStyle={toggleMapStyle} ></Theme>
      <MapContainer
        onMapLoad={ handleMapLoad }
        locations={ memoizedLocations }
        showMarkers={ state.showMarkers || state.showFavorites }
        style={ mapStyle }
      />
      { state.map && ( state.showMarkers || state.showFavorites || focusedEventId ) && (
        <MarkersLayer
          map={ state.map }
          locations={ state.showFavorites ? memoizedFavorites : markersLocations }
          showMarkers={ state.showMarkers || state.showFavorites }
          focusedEventId={ focusedEventId }
        />
      ) }
      { popupInfo && (
        <PopupManager
          handleToggleFavorite={ handleToggleFavorite }
          isEventFavorited={ isEventFavorited }
        />
      ) }
      <Toolbar
        onShowAllEvents={ handleShowAllEvents }
        onToggleMarkers={ handleToggleMarkers }
        onToggleFavorites={ handleToggleFavoritesVisibility }
        hasFavorites={ state.favorites.length > 0 }
      />
      { showUpcomingEvents && (
        <UpcomingEventsModal
          events={ sortedUpcomingEvents }
          onClose={ () => setShowUpcomingEvents( false ) }
          onMinimize={ handleMinimize }
          isMinimized={ isMinimized }
          onToggleMarkers={ handleToggleMarkers }
        />
      ) }
    </>
  );
};

export default React.memo( EventsMap );