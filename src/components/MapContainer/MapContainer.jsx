// MapContainer.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb3VzaW5oYSIsImEiOiJjbTIxbTh2cWgwcmNrMm9xdDIzbnVvem05In0.pO_vgJgRtaADjpSLFcLTuw';

const MapContainer = ( { onMapLoad, locations, showMarkers } ) => {
  const mapContainer = useRef( null );
  const [ map, setMap ] = useState( null );

  useEffect( () => {
    if ( !map ) {
      const mapInstance = new mapboxgl.Map( {
        container: mapContainer.current,
        style: 'mapbox://styles/carousinha/cm21os4cq005r01qvaj3b04sw',
        center: [ 0, 0 ],  // Establece el centro inicial en la bola del mundo
        zoom: 1.5,       // Zoom inicial para mostrar la bola del mundo
        pitch: 0,        // Pitch inicial sin inclinación
        bearing: 0
      } );

      mapInstance.on( 'load', () => {
        mapInstance.addControl(
          new mapboxgl.NavigationControl( {
            visualizePitch: true,
          } )
        );

        onMapLoad( mapInstance ); // Notifica cuando el mapa esté cargado
      } );

      setMap( mapInstance ); // Solo se ejecuta una vez para evitar re-renderizados.
    }

    return () => map && map.remove();
  }, [ map, onMapLoad ] );

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

  // Memorizar el contenedor del mapa para evitar re-renderizados.
  const mapContainerStyle = useMemo( () => ( { height: '100vh', width: '100%' } ), [] );

  return <div ref={ mapContainer } style={ mapContainerStyle } />;
};

export default MapContainer;
