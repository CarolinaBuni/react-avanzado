// MarkersLayer.jsx

import React, { useEffect, useMemo } from 'react';
import SquareLayer from './../CircleLayer/CircleLayer';
import EventHandlers from './../EventHandlers/EventHandlers';

const MarkersLayer = ({ map, locations, showMarkers }) => {
  const memoizedLocations = useMemo(() => locations, [locations]);

  useEffect(() => {
    console.log("MarkersLayer visibility changed", showMarkers);
    memoizedLocations.forEach((location) => {
      const layerId = `layer-${location.id}`;

      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', showMarkers ? 'visible' : 'none');
      }
    });
  }, [showMarkers, map, memoizedLocations]);

  return (
    <>
      {showMarkers && memoizedLocations.map((location, index) => (
        <React.Fragment key={location.id || index}>
          <SquareLayer map={map} location={location} />
          <EventHandlers map={map} location={location} />
        </React.Fragment>
      ))}
    </>
  );
};

export default MarkersLayer;
