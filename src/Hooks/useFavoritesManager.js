// useFavoritesManager.jsx

import { useCallback } from "react";

const useFavoritesManager = ({ map, favorites, setFavorites, locations }) => {
    const handleToggleFavorite = useCallback((event) => {
        console.log("Evento seleccionado para añadir o quitar de favoritos:", event);
        const isFavorited = favorites.some(fav => fav.id === event.id);

        // Obtener la altura original del evento desde locations
        const originalEvent = locations.find(loc => loc.id === event.id);
        const height = originalEvent?.height || event.height;

        const newFavorites = isFavorited
            ? favorites.filter(fav => fav.id !== event.id)
            : [...favorites, { ...event, height }]; 

        console.log("Estado actualizado de favoritos:", newFavorites);
        setFavorites(newFavorites);
    }, [favorites, setFavorites, locations]);

    const isEventFavorited = useCallback((eventId) => {
        return favorites.some((fav) => fav.id === eventId);
    }, [favorites]);

    return { handleToggleFavorite, isEventFavorited };
};

export default useFavoritesManager;
