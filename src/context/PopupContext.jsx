// context/PopupContext.js
import React, { createContext, useState, useCallback, useContext } from 'react';

// Creamos el contexto
const PopupContext = createContext();

// Definimos el proveedor del contexto
export const PopupProvider = ( { children } ) => {
     const [ popupInfo, setPopupInfo ] = useState( null );

     // Función para mostrar el popup con la información proporcionada
     const togglePopup = useCallback( ( info ) => {
          const fullInfo = {
               ...info,
               coordinates: info.coordinates || info?.location?.coordinates,
          };
          setPopupInfo( fullInfo );
     }, [] );

     // Función para cerrar el popup
     const closePopup = () => {
          setPopupInfo( null );
     };

     return (
          <PopupContext.Provider value={ { popupInfo, togglePopup, closePopup } }>
               { children }
          </PopupContext.Provider>
     );
};

// Hook para acceder al contexto
export const usePopup = () => useContext( PopupContext );
