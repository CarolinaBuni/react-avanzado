// SquareLayer.jsx

import { useEffect } from 'react';

const SquareLayer = ({ map, location, showMarkers, focusedEventId }) => {
  useEffect(() => {
    if (!location.coordinates || location.coordinates.length !== 2) {
      console.error('Invalid coordinates for location', location);
      return;
    }

    const layerId = `layer-${location.id}`;
    const sourceId = `source-${location.id}`;
    const coordinates = location.coordinates;

    // Define los colores para cada altura
    const colorMap = {
      300: '#ff0000',   
      600: '#33ff57',   
      900: '#ff4886',   
      1200: '#3357ff',  
      1500: '#a133ff'  
    };
    const extrusionColor = colorMap[location.height] || '#ff69b4'; // Color por defecto si no coincide

    if (!map.getSource(sourceId)) {
      const squareGeoJSON = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [coordinates[0] - 0.0005, coordinates[1] - 0.0005],
            [coordinates[0] + 0.0005, coordinates[1] - 0.0005],
            [coordinates[0] + 0.0005, coordinates[1] + 0.0005],
            [coordinates[0] - 0.0005, coordinates[1] + 0.0005],
            [coordinates[0] - 0.0005, coordinates[1] - 0.0005]
          ]]
        },
        properties: { height: location.height }
      };

      map.addSource(sourceId, { type: 'geojson', data: squareGeoJSON });
    }

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: 'fill-extrusion',
        source: sourceId,
        paint: {
          'fill-extrusion-color': extrusionColor, 
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.9
        },
        layout: { visibility: 'none' }
      });
    }
    // // Ajustar la visibilidad según `focusedEventId`
    // const visibility = location.id === focusedEventId ? 'visible' : 'none';
    // map.setLayoutProperty(layerId, 'visibility', visibility);
    // console.log(`Setting visibility of ${layerId} to ${visibility}`);

    // Controla la visibilidad de la capa basado en `showMarkers` y `focusedEventId`
    const isFocused = String(location.id) === focusedEventId; // Asegura que ambos sean cadenas
    const visibility = showMarkers || isFocused ? 'visible' : 'none';
    map.setLayoutProperty(layerId, 'visibility', visibility);



    return () => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
  }, [map, location, showMarkers, focusedEventId]);

  return null;
};

export default SquareLayer;
