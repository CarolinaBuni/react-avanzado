// useTheme.js
import { useCallback, useEffect, useState } from 'react';

export const useTheme = (initialTheme) => {
  const [mapStyle, setMapStyle] = useState(initialTheme);

  const toggleMapStyle = useCallback(() => {
    setMapStyle((prevStyle) =>
      prevStyle === 'mapbox://styles/carousinha/cm42ryp6b00wa01sdbeg7gedb'
        ? 'mapbox://styles/carousinha/cm42s8ta200yt01s8czgh594x'
        : 'mapbox://styles/carousinha/cm42ryp6b00wa01sdbeg7gedb'
    );
  }, []);
  // useEffect(() => {
  //    console.log('Initial mapStyle:', mapStyle);
  //  }, [mapStyle]);

  return [mapStyle, toggleMapStyle];
};


// mapbox://styles/carousinha/cm42s8ta200yt01s8czgh594x