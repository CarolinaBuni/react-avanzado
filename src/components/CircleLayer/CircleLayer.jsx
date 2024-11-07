// SquareLayer.jsx

// import { useEffect } from 'react';

// const SquareLayer = ({ map, location }) => {
//   useEffect(() => {
//     if (!location.coordinates || location.coordinates.length !== 2) {
//       console.error('Invalid coordinates for location', location);
//       return;
//     }

//     const layerId = `layer-${location.id}`;
//     const sourceId = `source-${location.id}`;
//     const coordinates = location.coordinates;

//     if (!map.getSource(sourceId)) {
//       const squareGeoJSON = {
//         type: 'Feature',
//         geometry: {
//           type: 'Polygon',
//           coordinates: [[
//             [coordinates[0] - 0.0005, coordinates[1] - 0.0005],
//             [coordinates[0] + 0.0005, coordinates[1] - 0.0005],
//             [coordinates[0] + 0.0005, coordinates[1] + 0.0005],
//             [coordinates[0] - 0.0005, coordinates[1] + 0.0005],
//             [coordinates[0] - 0.0005, coordinates[1] - 0.0005]
//           ]]
//         },
//         properties: { height: location.height || Math.floor(Math.random() * 1200) + 300 }
//       };

//       map.addSource(sourceId, { type: 'geojson', data: squareGeoJSON });
//     }

//     if (!map.getLayer(layerId)) {
//       map.addLayer({
//         id: layerId,
//         type: 'fill-extrusion',
//         source: sourceId,
//         paint: {
//           'fill-extrusion-color': '#fc007e',
//           'fill-extrusion-height': ['get', 'height'],
//           'fill-extrusion-base': 0,
          
//         },
//         layout: { visibility: 'visible' }
//       });
//     }

//     return () => {
//       if (map.getLayer(layerId)) map.removeLayer(layerId);
//       if (map.getSource(sourceId)) map.removeSource(sourceId);
//     };
//   }, [map, location]);

//   return null;
// };

// export default SquareLayer;

import { useEffect } from 'react';

const SquareLayer = ({ map, location, focusedEventId }) => {
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
      300: '#ff5733',   // Rojo
      600: '#33ff57',   // Verde
      900: '#ff4886',   // Azul
      1200: '#3357ff',  // Rosa
      1500: '#a133ff'   // Morado
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
          'fill-extrusion-color': extrusionColor, // Usa el color asociado a la altura
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': 0,
          
        },
        layout: { visibility: 'visible' }
      });
    }
    const visibility = location.id === focusedEventId ? 'visible' : 'none';
    map.setLayoutProperty(layerId, 'visibility', visibility);

    return () => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
  }, [map, location, focusedEventId]);

  return null;
};

export default SquareLayer;
