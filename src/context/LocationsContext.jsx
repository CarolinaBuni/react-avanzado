import React, { createContext, useState, useEffect, useContext } from 'react';

// Creamos el contexto para locations
const LocationsContext = createContext();

// Proveedor del contexto
export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=Madrid&apikey=xrdE9ZHXu6uGOvHCK5lXKw3ZuCB6c1TA'
        );
        const data = await response.json();
        
        const heights = [300, 600, 900, 1200, 1500];
        const events = data._embedded?.events.map(event => {
          const venue = event._embedded.venues[0];
          const randomHeight = heights[Math.floor(Math.random() * heights.length)];
          return {
            id: event.id,
            name: event.name,
            startDate: event.dates.start.localDate,
            classificationName: event.classifications[0]?.segment.name || '',
            genreName: event.classifications[0]?.genre.name || '',
            subGenreName: event.classifications[0]?.subGenre.name || '',
            promoterName: event.promoters?.[0]?.name || '',
            priceRanges: event.priceRanges || [],
            status: event.dates.status.code,
            venueName: venue.name,
            cityName: venue.city.name,
            address: venue.address.line1,
            coordinates: [parseFloat(venue.location.longitude), parseFloat(venue.location.latitude)],
            image: event.images[0]?.url || '',
            url: event.url,
            height: randomHeight
          };
        });

        setLocations(events || []);
      } catch (error) {
        console.error('Error obteniendo datos de la API de Ticketmaster:', error);
      } finally {
        setLoading(false);
      }
    };

    if (locations.length === 0) {
      fetchLocations();
    }
  }, [locations]);

  return (
    <LocationsContext.Provider value={{ locations, loading }}>
      {children}
    </LocationsContext.Provider>
  );
};

// Custom hook para acceder al contexto
export const useLocations = () => useContext(LocationsContext);
