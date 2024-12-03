// MapContainer.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb3VzaW5oYSIsImEiOiJjbTIxbTh2cWgwcmNrMm9xdDIzbnVvem05In0.pO_vgJgRtaADjpSLFcLTuw';

const MapContainer = React.memo(({ onMapLoad, locations, showMarkers, style }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

    // Log para depuración
  console.log("MapContainer render");

  useEffect(() => {
    if (!map) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style,
        center: [0, 0],
        zoom: 1.5,
        pitch: 0,
        bearing: 0
      });

      mapInstance.on('load', () => {
        mapInstance.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          })
        );
        onMapLoad(mapInstance);
        setMap(mapInstance);

      });

    }

    return () => map && map.remove();
  }, [map, onMapLoad]);

  // Este efecto escucha los cambios en la prop `style` y actualiza el estilo del mapa
  useEffect(() => {
    if (map && style) {
      map.setStyle(style); // Cambia el estilo del mapa dinámicamente
    }
  }, [style, map]);

  useEffect(() => {
    if (showMarkers && map && locations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach((location) => {
        bounds.extend(location.coordinates);
      });
      map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 1000
      }).once('moveend', () => {
        map.easeTo({
          pitch: 60,
          bearing: 0,
          duration: 1000
        });
      });
    }
  }, [showMarkers, map, locations]);

  const mapContainerStyle = useMemo(() => ({ height: '100vh', width: '100%' }), []);

  return <div ref={mapContainer} style={mapContainerStyle} />;
});

export default React.memo(MapContainer);