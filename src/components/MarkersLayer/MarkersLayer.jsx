// MarkersLayer.jsx

import React, { useMemo } from 'react';
import SquareLayer from '../SquareLayer/SquareLayer';
import EventHandlers from './../EventHandlers/EventHandlers';

// const MarkersLayer = React.memo(({ map, locations, showMarkers, focusedEventId }) => {
//     console.log("MarkersLayer component render");

//     const memoizedLocations = useMemo(() => locations, [locations]);

//     useEffect(() => {
//         console.log("MarkersLayer visibility changed:", showMarkers);
//         memoizedLocations.forEach((location) => {
//             const layerId = `layer-${location.id}`;
//             if (map.getLayer(layerId)) {
//                 map.setLayoutProperty(layerId, 'visibility', showMarkers ? 'visible' : 'none');
//             }
//         });
//     }, [showMarkers, map, memoizedLocations]);

//     return (
//         <>
//             {showMarkers && memoizedLocations.map((location) => (
//                 <React.Fragment key={location.id}>
//                     <SquareLayer 
//                     map={map} 
//                     location={location}
//                     showMarkers={showMarkers} 
//                     focusedEventId={focusedEventId}  
//                     />
//                     <EventHandlers map={map} location={location} />
//                 </React.Fragment>
//             ))}
//         </>
//     );
// });

// export default MarkersLayer;




// const MarkersLayer = React.memo(({ map, locations, showMarkers, focusedEventId }) => {
//     console.log("MarkersLayer component render");

//     const memoizedLocations = useMemo(() => locations, [locations]);

//     useEffect(() => {
//         console.log("MarkersLayer visibility changed:", showMarkers);

//         memoizedLocations.forEach((location) => {
//             const layerId = `layer-${location.id}`;
//             if (map.getLayer(layerId)) {
//                 const visibility = showMarkers || location.id === focusedEventId ? 'visible' : 'none';
//                 map.setLayoutProperty(layerId, 'visibility', visibility);
//             }
//         });
//     }, [showMarkers, focusedEventId, map, memoizedLocations]);

//     return (
//         <>
//             {memoizedLocations.map((location) => (
//                 <React.Fragment key={location.id}>
//                     <SquareLayer 
//                         map={map} 
//                         location={location} 
//                         showMarkers={showMarkers} 
//                         focusedEventId={focusedEventId} 
//                     />
//                     <EventHandlers map={map} location={location} />
//                 </React.Fragment>
//             ))}
//         </>
//     );
// });

// export default MarkersLayer;


const MarkersLayer = React.memo(({ map, locations, showMarkers, focusedEventId }) => {
    console.log("MarkersLayer component render");

    const memoizedLocations = useMemo(() => locations, [locations]);

    return (
        <>
            {memoizedLocations.map((location) => (
                <React.Fragment key={location.id}>
                    <SquareLayer 
                        map={map} 
                        location={location}
                        showMarkers={showMarkers} 
                        focusedEventId={focusedEventId} 
                    />
                    <EventHandlers map={map} location={location} />
                </React.Fragment>
            ))}
        </>
    );
});

export default MarkersLayer;