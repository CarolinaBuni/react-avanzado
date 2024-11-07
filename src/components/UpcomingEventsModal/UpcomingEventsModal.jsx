// UpcomingEventsModal.jsx
import './UpcomingEventsModal.css';
import React from 'react';

const UpcomingEventsModal = ( { events, onClose, onMinimize, isMinimized, onToggleMarkers } ) => {


     const upcomingEvents = events.slice( 0, 5 );

     if ( isMinimized ) {
          // Mostrar solo el ícono si está minimizado
          return (
               <div className="minimized-icon" onClick={ onMinimize }>
                    <img className="maximize-button" src="/assets/flecha-hacia-arriba.png" alt="flecha arriba" />
               </div>
          );
     }
     // const handleMarkers = ( event ) => {
     //      onToggleMarkers( event.id ); // Pasa el ID del evento a `onToggleMarkers`
     // };

     return (
          <div className="upcoming-events-modal">
               <div className="modal-header">
                    <h4>Próximos Eventos</h4>
                    <img onClick={ onMinimize } className="minimize-button" src="/assets/flecha-hacia-abajo.png" alt="minimizar" />
               </div>
               <ul>
                    { upcomingEvents.map( ( event ) => (
                         <li key={ event.id } onClick={ () => onToggleMarkers( event.id ) }>
                              <strong>{ event.name }</strong> - { new Date( event.startDate ).toLocaleDateString() }
                         </li>
                    ) ) }
               </ul>
          </div>
     );
};

export default UpcomingEventsModal;