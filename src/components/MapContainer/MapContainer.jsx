// MapContainer.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb3VzaW5oYSIsImEiOiJjbTIxbTh2cWgwcmNrMm9xdDIzbnVvem05In0.pO_vgJgRtaADjpSLFcLTuw';

const MapContainer = ({ onMapLoad, locations, showMarkers }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/carousinha/cm21os4cq005r01qvaj3b04sw',
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
      });

      setMap(mapInstance);
    }

    return () => map && map.remove();
  }, [map, onMapLoad]);

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
};

export default React.memo(MapContainer);
