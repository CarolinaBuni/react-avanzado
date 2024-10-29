// useFavoritesManager.jsx

// import { useCallback } from "react";

// const useFavoritesManager = ({ map, favorites, setFavorites, setShowMarkers, showFavorites, setShowFavorites }) => {

//   // Alternar entre eventos normales y favoritos
//   const toggleFavoritesVisibility = useCallback(() => {
//     console.log("Toggling favorites visibility in useFavoritesManager");
//     setShowFavorites((prevState) => {
//       const newState = !prevState;

//       if (newState) {
//         setShowMarkers(true); // Asegurar que los marcadores se muestren
//       } else {
//         setShowMarkers(false); // Puedes ocultarlos si sales de la vista de favoritos
//       }

//       if (newState && map && favorites.length > 0) {
//         const bounds = new mapboxgl.LngLatBounds();
//         favorites.forEach((fav) => {
//           if (fav.coordinates && fav.coordinates.length === 2) {
//             bounds.extend(fav.coordinates);
//           }
//         });
//         if (!bounds.isEmpty()) {
//           map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 1000 });
//         }
//       }

//       return newState;
//     });
//   }, [map, favorites, setShowMarkers, setShowFavorites]);

//   // Marcar/desmarcar un evento como favorito
//   const handleToggleFavorite = useCallback((event) => {
//     console.log("Toggling favorite status for event", event.id);
//     setFavorites(prevFavorites => {
//       const isFavorited = prevFavorites.some(fav => fav.id === event.id);
      
//       // Si ya es favorito, elimínalo, si no, agrégalo
//       const newFavorites = isFavorited
//         ? prevFavorites.filter(fav => fav.id !== event.id) // Elimina si es favorito
//         : [...prevFavorites, { ...event, height: event.height || Math.floor(Math.random() * 1200) + 300 }]; // Agrega si no es favorito
  
//       console.log("Nuevo estado de favoritos tras toggle:", newFavorites);
//       return newFavorites;
//     });
//   }, [setFavorites]);
  
  
  

//   // Verificar si un evento es favorito
//   const isEventFavorited = useCallback((eventId) => {
//     return favorites.some((fav) => fav.id === eventId);
//   }, [favorites]);

//   return { toggleFavoritesVisibility, handleToggleFavorite, isEventFavorited };
// };

// export default useFavoritesManager;



// useFavoritesManager.js

import { useCallback } from "react";

const useFavoritesManager = ({ map, favorites, setFavorites, setShowMarkers, showFavorites, setShowFavorites }) => {

  const toggleFavoritesVisibility = useCallback(() => {
    console.log("Toggling favorites visibility in useFavoritesManager");
    setShowFavorites((prevState) => {
      const newState = !prevState;
      setShowMarkers(newState);

      if (newState && map && favorites.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        favorites.forEach((fav) => {
          if (fav.coordinates && fav.coordinates.length === 2) {
            bounds.extend(fav.coordinates);
          }
        });
        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 1000 });
        }
      }
      return newState;
    });
  }, [map, favorites, setShowMarkers, setShowFavorites]);

  const handleToggleFavorite = useCallback((event) => {
    console.log("Toggling favorite status for event", event);
    setFavorites(prevFavorites => {
      const isFavorited = prevFavorites.some(fav => fav.id === event.id);
      
      const newFavorites = isFavorited
        ? prevFavorites.filter(fav => fav.id !== event.id)
        : [...prevFavorites, { ...event, height: event.height }]; // Preserva el 'height'

        console.log("Nuevo estado de favoritos tras toggle:", newFavorites.map(fav => ({
          id: fav.id,
          height: fav.height  // Aquí comprobamos que 'height' está presente
        })));
      return newFavorites;
    });
  }, [setFavorites]);

  const isEventFavorited = useCallback((eventId) => {
    return favorites.some((fav) => fav.id === eventId);
  }, [favorites]);

  return { toggleFavoritesVisibility, handleToggleFavorite, isEventFavorited };
};

export default useFavoritesManager;
