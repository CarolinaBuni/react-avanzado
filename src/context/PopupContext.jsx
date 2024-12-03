// context/PopupContext.js
import React, { createContext, useState, useCallback, useContext } from 'react';

const PopupContext = createContext();

// Proveedor del contexto
export const PopupProvider = ( { children } ) => {
    const [ popupInfo, setPopupInfo ] = useState( null );

    const togglePopup = useCallback( ( info ) => {
        setPopupInfo( ( prev ) => {
            if ( prev && prev.id === info.id ) {
                
                return prev;
            }
            return info;  
        } );
        
    }, [] );

    const closePopup = useCallback( () => {
        setPopupInfo( null );
    }, [] );

    return (
        <PopupContext.Provider value={ { popupInfo, togglePopup, closePopup } }>
            { children }
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext( PopupContext );