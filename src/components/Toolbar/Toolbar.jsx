// Toolbar.jsx
import { useEffect, useRef, useState } from 'react';
import './Toolbar.css';

const Toolbar = ( { onToggleMarkers, onToggleFavorites, onShowAllEvents, hasFavorites } ) => {
     const refToggle = useRef();
     const [ isMarkersActive, setIsMarkersActive ] = useState( false );
     const [ isFavoritesActive, setIsFavoritesActive ] = useState( false );

     console.log("Toolbar Render");
     

     const activeButton = () => {
          refToggle.current.classList.toggle( 'active' );
     };

     const handleToggleMarkers = ( event ) => {
          event.stopPropagation();
          setIsMarkersActive( ( prevState ) => !prevState );
          setIsFavoritesActive( false ); 
          onToggleMarkers();
     };

     const handleToggleFavorites = ( event ) => {
          event.stopPropagation();
          if ( hasFavorites ) {
               setIsFavoritesActive( ( prevState ) => !prevState );
               setIsMarkersActive( false ); 
               onToggleFavorites();
          }
     };

     useEffect( () => {
          if ( !hasFavorites ) {
               setIsFavoritesActive( false ); 
          }
     }, [ hasFavorites ] );

     return (
          <div className="navigation">
               <div className="menuTogle" ref={ refToggle } onClick={ activeButton }>
                    <i></i>
               </div>
               <div className="menu">
                    <ul>
                         <li
                              style={ { '--i': '0.1s' } }
                              onClick={ handleToggleMarkers }
                              className={ isMarkersActive ? 'active' : '' }
                         >
                              <a href="#">
                                   <ion-icon name="musical-notes-outline"></ion-icon>
                              </a>
                         </li>
                         <li></li>
                         <li></li>
                         <li
                              style={ { '--i': '0.2s' } }
                              onClick={ handleToggleFavorites }
                              className={ isFavoritesActive && hasFavorites ? 'active' : '' }
                         >
                              <a href="#">
                                   <ion-icon name="heart-outline"></ion-icon>
                              </a>
                         </li>
                    </ul>
               </div>
          </div>
     );
};

export default Toolbar;