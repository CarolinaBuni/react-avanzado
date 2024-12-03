// useFavoritesManager.jsx

import { useCallback } from "react";

const useFavoritesManager = ({ map, favorites, setFavorites, locations }) => {
    const handleToggleFavorite = useCallback((event) => {

        const isFavorited = favorites.some(fav => fav.id === event.id);

        // Obtener la altura original del evento desde locations
        const originalEvent = locations.find(loc => loc.id === event.id);
        const height = originalEvent?.height || event.height;

        const newFavorites = isFavorited
            ? favorites.filter(fav => fav.id !== event.id)
            : [...favorites, { ...event, height }]; 

        setFavorites(newFavorites);
    }, [favorites, setFavorites, locations]);

    const isEventFavorited = useCallback((eventId) => {
        return favorites.some((fav) => fav.id === eventId);
    }, [favorites]);

    return { handleToggleFavorite, isEventFavorited };
};

export default useFavoritesManager;
