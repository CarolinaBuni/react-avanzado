// // CustomPopup.jsx
// import React from 'react';
// import './CustomPopup.css';  
// import CloseButton from '../CloseButton/CloseButton';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// const CustomPopup = ({ popupInfo, onClose, onToggleFavorite, isFavorited }) => {
//   if (!popupInfo) return null;


//   const { 
//     name,
//     id,
//     height, 
//     startDate, 
//     classificationName, 
//     genreName, 
//     subGenreName, 
//     promoterName, 
//     priceRanges, 
//     venueName, 
//     cityName, 
//     address, 
//     image, 
//     url 
//   } = popupInfo;

//   return (
//     <div className="custom-popup-container" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
//       <CloseButton onClose={onClose} />
//       <div className="popup-header">
//         {/* Botón de favorito */}

//         <button onClick={() => 
//           onToggleFavorite(popupInfo)} className="favorite-button">
//           {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />} {/* Cambiar icono si es favorito */}
//         </button>

//       </div>
//       <div className="custom-popup-content">
//         {image && <img src={image} alt={`Imagen de ${name}`} className="popup-image" />}
//         <h4 className="popup-title">{name}</h4>
//         <p><strong>Fecha:</strong> {startDate}</p>
//         <p><strong>Clasificación:</strong> {classificationName}</p>
//         <p><strong>Género:</strong> {genreName}</p>
//         <p><strong>Subgénero:</strong> {subGenreName}</p>
//         <p><strong>Promotor:</strong> {promoterName}</p>
//         {priceRanges && priceRanges.length > 0 && (
//           <p><strong>Precios:</strong> {priceRanges.map(range => `${range.min}€ - ${range.max}€`).join(', ')}</p>
//         )}
//         <p><strong>Lugar:</strong> {venueName}</p>
//         <p><strong>Ciudad:</strong> {cityName}</p>
//         <p><strong>Dirección:</strong> {address}</p>
//         <a href={url} target="_blank" rel="noopener noreferrer" className="popup-link">
//           Más información
//         </a>
//       </div>
//     </div>
//   );
// };

// export default CustomPopup;


import React from 'react';
import './CustomPopup.css';
import CloseButton from '../CloseButton/CloseButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const CustomPopup = ({ popupInfo, onClose, onToggleFavorite, isFavorited }) => {
  if (!popupInfo) return null;

  const {
    name,
    startDate,
    classificationName,
    genreName,
    subGenreName,
    promoterName,
    priceRanges,
    venueName,
    cityName,
    address,
    image,
    url
  } = popupInfo;

  return (
    <div className="custom-popup-container" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <CloseButton onClose={onClose} />
      <div className="popup-header">
        <FavoriteButton isFavorited={isFavorited} onToggle={() => onToggleFavorite(popupInfo)} />
      </div>
      <div className="custom-popup-content">
        {image && <img src={image} alt={`Imagen de ${name}`} className="popup-image" />}
        <h4 className="popup-title">{name}</h4>
        <p><strong>Fecha:</strong> {startDate}</p>
        <p><strong>Clasificación:</strong> {classificationName}</p>
        <p><strong>Género:</strong> {genreName}</p>
        <p><strong>Subgénero:</strong> {subGenreName}</p>
        <p><strong>Promotor:</strong> {promoterName}</p>
        {priceRanges && priceRanges.length > 0 && (
          <p><strong>Precios:</strong> {priceRanges.map(range => `${range.min}€ - ${range.max}€`).join(', ')}</p>
        )}
        <p><strong>Lugar:</strong> {venueName}</p>
        <p><strong>Ciudad:</strong> {cityName}</p>
        <p><strong>Dirección:</strong> {address}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="popup-link">
          Más información
        </a>
      </div>
    </div>
  );
};

export default CustomPopup;
