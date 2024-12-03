// SquareLayer.jsx

import { useEffect } from 'react';

const SquareLayer = ({ map, location, showMarkers, focusedEventId }) => {
  console.log("SquareLayer Render");
  
  useEffect(() => {
    if (!map || !location.coordinates || location.coordinates.length !== 2) {
      console.error('Invalid coordinates for location', location);
      return;
    }

    const layerId = `layer-${location.id}`;
    const sourceId = `source-${location.id}`;
    const coordinates = location.coordinates;

    // Colores para cada altura
    const colorMap = {
      300: '#ff5733',   
      600: '#33ff57',   
      900: '#ff4886',   
      1200: '#3357ff',  
      1500: '#a133ff'    
    };
    const extrusionColor = colorMap[location.height] || '#ff69b4';
    
    // Función para crear/recrear la fuente y la capa
    const createLayerAndSource = () => {
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

      // Añadir/actualizar la fuente
      if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(squareGeoJSON);
      } else {
        map.addSource(sourceId, { 
          type: 'geojson', 
          data: squareGeoJSON 
        });
      }

      // Recrear la capa si no existe
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: 'fill-extrusion',
          source: sourceId,
          paint: {
            'fill-extrusion-color': extrusionColor,
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': 0,
          },
          layout: { 
            visibility: showMarkers || String(location.id) === focusedEventId ? 'visible' : 'none' 
          }
        });
      } else {
        // Actualizar la visibilidad si la capa ya existe
        map.setLayoutProperty(
          layerId,
          'visibility',
          showMarkers || String(location.id) === focusedEventId ? 'visible' : 'none'
        );
      }
    };

    // Crear las capas inicialmente
    createLayerAndSource();

    // Escuchar el evento style.load para recrear las capas cuando cambie el estilo
    map.on('style.load', createLayerAndSource);

    // Limpieza
    return () => {
      map.off('style.load', createLayerAndSource);
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
  }, [map, location, showMarkers, focusedEventId]);

  return null;
};

export default SquareLayer;