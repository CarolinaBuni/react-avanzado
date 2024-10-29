// // EventsMap.jsx

// import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
// import useFetchLocations from '../../Hooks/useFetchLocations';
// import MapContainer from '../../components/MapContainer/MapContainer';
// import MarkersLayer from '../../components/MarkersLayer/MarkersLayer';
// import Toolbar from '../../components/Toolbar/Toolbar';
// import PopupManager from '../../components/PopupManager/PopupManager';
// import { eventsReducer, INITIAL_STATE } from '../../utils/reducer';
// import { setFavorites, setMap, toggleFavoritesVisibility, toggleMarkersVisibility } from '../../utils/actions';
// import useFavoritesManager from '../../Hooks/useFavoritesManager';

// const EventsMap = () => {
//   const locations = useFetchLocations();
//   const [state, dispatch] = useReducer(eventsReducer, INITIAL_STATE);

//   const { toggleFavoritesVisibility, handleToggleFavorite, isEventFavorited } = useFavoritesManager({
//     map: state.map,
//     favorites: state.favorites,
//     setFavorites: (favorites) => dispatch({ type: 'SET_FAVORITES', payload: favorites }),
//     setShowMarkers: (value) => dispatch({ type: 'TOGGLE_MARKERS', payload: value }),
//     showFavorites: state.showFavorites,
//     setShowFavorites: () => dispatch({ type: 'TOGGLE_FAVORITES_VISIBILITY' }),
//   });

//   const memoizedLocations = useMemo(() => {
//     return locations.map(location => ({
//       ...location,
//       height: location.height || Math.floor(Math.random() * 1200) + 300,
//     }));
//   }, [locations]);

//   const handleMapLoad = useCallback((mapInstance) => {
//     setMap(dispatch, mapInstance);
//   }, [dispatch]);

//   const handleToggleMarkers = () => {
//     if (state.showFavorites) {
//       toggleFavoritesVisibility(dispatch);
//     }
//     toggleMarkersVisibility(dispatch);
//   };

//   const handleToggleFavoritesVisibility = () => {
//     if (state.showMarkers) {
//       toggleMarkersVisibility(dispatch);
//     }
//     toggleFavoritesVisibility(dispatch);
//   };

//   return (
//     <>
//       <MapContainer
//         onMapLoad={handleMapLoad}
//         locations={memoizedLocations}
//         showMarkers={state.showMarkers || state.showFavorites} // Show markers based on state
//       />
//       {state.map && (locations.length > 0 || state.favorites.length > 0) && (
//         <MarkersLayer
//           map={state.map}
//           locations={state.showFavorites ? state.favorites : locations}
//           showMarkers={state.showMarkers || state.showFavorites}
//         />
//       )}
//       <PopupManager
//         handleToggleFavorite={(favorite) => {
//           if (favorite) {
//             const updatedFavorites = state.favorites.some(fav => fav.id === favorite.id)
//               ? state.favorites.filter(fav => fav.id !== favorite.id)
//               : [...state.favorites, favorite];

//             setFavorites(dispatch, updatedFavorites);
//           }
//         }}
//         isEventFavorited={(id) => state.favorites.some(fav => fav.id === id)}
//       />
//       <Toolbar
//         onToggleMarkers={handleToggleMarkers}
//         onToggleFavorites={handleToggleFavoritesVisibility}
//         hasFavorites={state.favorites.length > 0}
//       />
//     </>
//   );
// };

// export default EventsMap;

// import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
// import useFetchLocations from '../../Hooks/useFetchLocations';
// import MapContainer from '../../components/MapContainer/MapContainer';
// import MarkersLayer from '../../components/MarkersLayer/MarkersLayer';
// import Toolbar from '../../components/Toolbar/Toolbar';
// import PopupManager from '../../components/PopupManager/PopupManager';
// import { eventsReducer, INITIAL_STATE } from '../../utils/reducer';
// import { setFavorites, setMap, toggleFavoritesVisibility, toggleMarkersVisibility } from '../../utils/actions';
// import useFavoritesManager from '../../Hooks/useFavoritesManager';

// const EventsMap = () => {
//   console.log('Renderizando EventsMap');

//   const locations = useFetchLocations();
//   const [state, dispatch] = useReducer(eventsReducer, INITIAL_STATE);

//   const { toggleFavoritesVisibility, handleToggleFavorite, isEventFavorited } = useFavoritesManager({
//     map: state.map,
//     favorites: state.favorites,
//     setFavorites: (favorites) => dispatch({ type: 'SET_FAVORITES', payload: favorites }),
//     setShowMarkers: (value) => dispatch({ type: 'TOGGLE_MARKERS', payload: value }),
//     showFavorites: state.showFavorites,
//     setShowFavorites: () => dispatch({ type: 'TOGGLE_FAVORITES_VISIBILITY' }),
//   });

  
//   const memoizedLocations = useMemo(
//     () => locations.map((location) => ({ ...location, height: location.height || Math.floor(Math.random() * 1200) + 300 })),
//     [locations]
//   );

//   const handleMapLoad = useCallback((mapInstance) => {
//     console.log("Map loaded:", mapInstance);
//     setMap(dispatch, mapInstance);
//   }, [dispatch]);

//   const handleToggleMarkers = useCallback(() => {
//     console.log('Toggling markers visibility');
//     if (state.showFavorites) {
//       toggleFavoritesVisibility(dispatch); // Cierra favoritos
//     }
//     toggleMarkersVisibility(dispatch); // Alterna marcadores
//   }, [state.showFavorites, dispatch]);

//   const handleToggleFavoritesVisibility = useCallback(() => {
//     console.log('Toggling favorites visibility');
//     if (state.showMarkers) {
//       toggleMarkersVisibility(dispatch); // Cierra eventos
//     }
//     toggleFavoritesVisibility(dispatch); // Alterna favoritos
//   }, [state.showMarkers, dispatch]);

//   return (
//     <>
//       <MapContainer onMapLoad={handleMapLoad} locations={memoizedLocations} showMarkers={state.showMarkers || state.showFavorites} />
//       {state.map && (locations.length > 0 || state.favorites.length > 0) && (
//         <MarkersLayer map={state.map} locations={state.showFavorites ? state.favorites : locations} showMarkers={state.showMarkers || state.showFavorites} />
//       )}
//       <PopupManager
//         handleToggleFavorite={(favorite) => {
//           if (favorite) {
//             const updatedFavorites = state.favorites.some((fav) => fav.id === favorite.id)
//               ? state.favorites.filter((fav) => fav.id !== favorite.id)
//               : [...state.favorites, favorite];
//             setFavorites(dispatch, updatedFavorites);
//           }
//         }}
//         isEventFavorited={(id) => state.favorites.some((fav) => fav.id === id)}
//       />
//       <Toolbar onToggleMarkers={handleToggleMarkers} onToggleFavorites={handleToggleFavoritesVisibility} hasFavorites={state.favorites.length > 0} />
//     </>
//   );
// };

// export default EventsMap;



import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import useFetchLocations from '../../Hooks/useFetchLocations';
import MapContainer from '../../components/MapContainer/MapContainer';
import MarkersLayer from '../../components/MarkersLayer/MarkersLayer';
import Toolbar from '../../components/Toolbar/Toolbar';
import PopupManager from '../../components/PopupManager/PopupManager';
import { eventsReducer, INITIAL_STATE } from '../../utils/reducer';
import { setFavorites, setMap, toggleFavoritesVisibility, toggleMarkersVisibility } from '../../utils/actions';
import useFavoritesManager from '../../Hooks/useFavoritesManager';

const EventsMap = () => {
  console.log('Renderizando EventsMap');

  const locations = useFetchLocations();
  console.log(locations);
  
  const [state, dispatch] = useReducer(eventsReducer, INITIAL_STATE);

  const { toggleFavoritesVisibility, handleToggleFavorite, isEventFavorited } = useFavoritesManager({
    map: state.map,
    favorites: state.favorites,
    setFavorites: (favorites) => dispatch({ type: 'SET_FAVORITES', payload: favorites }),
    setShowMarkers: (value) => dispatch({ type: 'TOGGLE_MARKERS', payload: value }),
    showFavorites: state.showFavorites,
    setShowFavorites: () => dispatch({ type: 'TOGGLE_FAVORITES_VISIBILITY' }),
  });

  const memoizedLocations = useMemo(() => {
    console.log('Calculating memoized locations');
    return locations.map((location) => ({
      ...location,
      height: location.height || Math.floor(Math.random() * 1200) + 300,
    }));
  }, [locations]);

  const handleMapLoad = useCallback((mapInstance) => {
    console.log('Map loaded:', mapInstance);
    setMap(dispatch, mapInstance);
  }, [dispatch]);

  const handleToggleMarkers = useCallback(() => {
    console.log('Toggling markers visibility');
    if (state.showFavorites) {
      toggleFavoritesVisibility(dispatch);
    }
    toggleMarkersVisibility(dispatch);
  }, [state.showFavorites, dispatch]);

  const handleToggleFavoritesVisibility = useCallback(() => {
    console.log('Toggling favorites visibility');
    if (state.showMarkers) {
      toggleMarkersVisibility(dispatch);
    }
    toggleFavoritesVisibility(dispatch);
  }, [state.showMarkers, dispatch]);

  return (
    <>
      <MapContainer
        onMapLoad={handleMapLoad}
        locations={memoizedLocations}
        showMarkers={state.showMarkers || state.showFavorites}
      />
      {state.map && (locations.length > 0 || state.favorites.length > 0) && (
        <MarkersLayer
          map={state.map}
          locations={state.showFavorites ? state.favorites : locations}
          showMarkers={state.showMarkers || state.showFavorites}
        />
      )}
      <PopupManager
        handleToggleFavorite={(favorite) => {
          if (favorite) {
            console.log('Toggling favorite for:', favorite);
            const updatedFavorites = state.favorites.some((fav) => fav.id === favorite.id)
              ? state.favorites.filter((fav) => fav.id !== favorite.id)
              : [...state.favorites, favorite];
            console.log('Updated favorites:', updatedFavorites);
            setFavorites(dispatch, updatedFavorites);
          }
        }}
        isEventFavorited={(id) => {
          const isFavorited = state.favorites.some((fav) => fav.id === id);
          console.log('Is event favorited:', id, isFavorited);
          return isFavorited;
        }}
      />
      <Toolbar
        onToggleMarkers={handleToggleMarkers}
        onToggleFavorites={handleToggleFavoritesVisibility}
        hasFavorites={state.favorites.length > 0}
      />
    </>
  );
};

export default EventsMap;

