// useMapEventHandlers.js

import { useEffect } from 'react';
import { usePopup } from '../context/PopupContext';

export const useMapEventHandlers = ( map, location ) => {
     const { togglePopup } = usePopup();

     useEffect( () => {
          const handleMapClick = ( e ) => {

               togglePopup( {
                    id: location.id,
                    name: location.name,
                    coordinates: location.coordinates,
                    startDate: location.startDate,
                    classificationName: location.classificationName,
                    genreName: location.genreName,
                    subGenreName: location.subGenreName,
                    promoterName: location.promoterName,
                    priceRanges: location.priceRanges,
                    venueName: location.venueName,
                    cityName: location.cityName,
                    address: location.address,
                    image: location.image,
                    url: location.url,
                    status: location.status,
               } );
          };

          const handleMouseEnter = () => {

               map.getCanvas().style.cursor = 'pointer';
          };

          const handleMouseLeave = () => {

               map.getCanvas().style.cursor = '';
          };

          // Añadir event listeners
          map.on( 'click', `layer-${ location.id }`, handleMapClick );
          map.on( 'mouseenter', `layer-${ location.id }`, handleMouseEnter );
          map.on( 'mouseleave', `layer-${ location.id }`, handleMouseLeave );

          // Cleanup
          return () => {
               map.off( 'click', `layer-${ location.id }`, handleMapClick );
               map.off( 'mouseenter', `layer-${ location.id }`, handleMouseEnter );
               map.off( 'mouseleave', `layer-${ location.id }`, handleMouseLeave );
          };
     }, [ map, location, togglePopup ] );
};