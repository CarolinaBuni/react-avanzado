// MarkersLayer.jsx

import React, { useMemo } from 'react';
import SquareLayer from '../SquareLayer/SquareLayer';
import { useMapEventHandlers } from '../../Hooks/useMapEventHandler';


const MarkerWithEvents = React.memo(({ map, location, showMarkers, focusedEventId }) => {
    useMapEventHandlers(map, location);

    return (
        <SquareLayer 
            map={map} 
            location={location}
            showMarkers={showMarkers} 
            focusedEventId={focusedEventId} 
        />
    );
});

const MarkersLayer = React.memo(({ map, locations, showMarkers, focusedEventId }) => {
console.log("Markers Layer Render");

    const memoizedLocations = useMemo(() => locations, [locations]);

    return (
        <>
            {memoizedLocations.map((location) => (
                <MarkerWithEvents
                    key={location.id}
                    map={map}
                    location={location}
                    showMarkers={showMarkers}
                    focusedEventId={focusedEventId}
                />
            ))}
        </>
    );
});

export default MarkersLayer;