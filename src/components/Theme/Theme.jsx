// // Theme.jsx
// import React, { useCallback, useEffect } from 'react';

// const Theme = React.memo(({ toggleMapStyle }) => {
//   // useCallback para memorizar la función
//   const handleThemeChange = useCallback(() => {
//     toggleMapStyle();
//   }, [toggleMapStyle]);

//   return (
//     <button onClick={handleThemeChange} className="style-toggle-btn">
//       <img src='/assets/icons/modo-oscuro.png' alt="toggle theme" />
//     </button>
//   );
// }, (prevProps, nextProps) => {
//   // Función de comparación personalizada para memo
//   return prevProps.toggleMapStyle === nextProps.toggleMapStyle;
// });

// // Añadir displayName para mejor debugging
// Theme.displayName = 'Theme';

// export default Theme;

import React, { useCallback } from 'react';

const Theme = React.memo(({ toggleMapStyle }) => {
 console.log("Theme Render");
 
  const handleThemeChange = useCallback(() => {
    toggleMapStyle();  // Llama a la función que cambia el estilo solo cuando el usuario hace clic
  }, [toggleMapStyle]);

  return (
    <button onClick={handleThemeChange} className="style-toggle-btn">
      <img src='/assets/icons/modo-oscuro.png' alt="toggle theme" />
    </button>
  );
});

export default Theme;
