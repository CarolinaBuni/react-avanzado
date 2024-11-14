// // useFetchLocations.js
// import { input } from 'framer-motion/client';
import { useState, useEffect } from 'react';

// const useFetchLocations = () => {
//   const [locations, setLocations] = useState([]); 

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch(
//           'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=Madrid&classificationName=music&apikey=xrdE9ZHXu6uGOvHCK5lXKw3ZuCB6c1TA&size=20'
//         );
        
//         const data = await response.json();
        
        
        
//         const events = data._embedded?.events
//           .filter(event => {
//             const venue = event._embedded.venues[0];
//             return venue && venue.location && venue.location.latitude && venue.location.longitude;
//           })
//           .map(event => {
//             const venue = event._embedded.venues[0];
//             return {
//               id: event.id,
//               name: event.name,
//               startDate: event.dates.start.localDate,
//               classificationName: event.classifications[0]?.segment.name || '',
//               genreName: event.classifications[0]?.genre.name || '',
//               subGenreName: event.classifications[0]?.subGenre.name || '',
//               promoterName: event.promoters?.[0]?.name || '',
//               priceRanges: event.priceRanges || [],
//               venueName: venue.name,
//               cityName: venue.city.name,
//               address: venue.address.line1,
//               coordinates: [parseFloat(venue.location.longitude), parseFloat(venue.location.latitude)],
//               image: event.images[0]?.url || '',
//               url: event.url,
//               height: Math.floor(Math.random() * 1200) + 300
//             };
//           });
          
//         setLocations(events || []); 
//       } catch (error) {
//         console.error('Error obteniendo datos de la API de Ticketmaster:', error);
//       }
//     };

//     fetchLocations();
//   }, []);

//   return locations;
// };

// export default useFetchLocations;


const useFetchLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=Madrid&classificationName=music&apikey=xrdE9ZHXu6uGOvHCK5lXKw3ZuCB6c1TA&size=15'
        );
        
        const data = await response.json();
        
        const heights = [300, 600, 900, 1200, 1500]; // Cinco alturas específicas
        const events = data._embedded?.events
          .filter(event => {
            const venue = event._embedded.venues[0];
            return venue && venue.location && venue.location.latitude && venue.location.longitude;
          })
          .map(event => {
            const venue = event._embedded.venues[0];
            const randomHeight = heights[Math.floor(Math.random() * heights.length)]; // Selecciona una altura aleatoria
            return {
              id: event.id,
              name: event.name,
              startDate: event.dates.start.localDate,
              classificationName: event.classifications[0]?.segment.name || '',
              genreName: event.classifications[0]?.genre.name || '',
              subGenreName: event.classifications[0]?.subGenre.name || '',
              promoterName: event.promoters?.[0]?.name || '',
              priceRanges: event.priceRanges || [],
              venueName: venue.name,
              cityName: venue.city.name,
              address: venue.address.line1,
              coordinates: [parseFloat(venue.location.longitude), parseFloat(venue.location.latitude)],
              image: event.images[0]?.url || '',
              url: event.url,
              height: randomHeight // Usa una de las cinco alturas específicas
            };
          });

          

        setLocations(events || []);
      } catch (error) {
        console.error('Error obteniendo datos de la API de Ticketmaster:', error);
      }
    };

    fetchLocations();
  }, []);

  return locations;
};

export default useFetchLocations;
