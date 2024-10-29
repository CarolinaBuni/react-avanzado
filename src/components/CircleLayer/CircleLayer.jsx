// SquareLayer.jsx

import { useEffect } from 'react';

const SquareLayer = ({ map, location }) => {
  useEffect(() => {
    if (!location.coordinates || location.coordinates.length !== 2) {
      console.error('Invalid coordinates for location', location);
      return;
    }

    const layerId = `layer-${location.id}`;
    const sourceId = `source-${location.id}`;
    const coordinates = location.coordinates;

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
        properties: { height: location.height || Math.floor(Math.random() * 1200) + 300 }
      };

      map.addSource(sourceId, { type: 'geojson', data: squareGeoJSON });
    }

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: 'fill-extrusion',
        source: sourceId,
        paint: {
          'fill-extrusion-color': '#ff69b4',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.9,
        },
        layout: { visibility: 'visible' }
      });
    }

    return () => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
  }, [map, location]);

  return null;
};

export default SquareLayer;
