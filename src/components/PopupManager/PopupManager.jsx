// PopupManager.jsx
import './PopupManager.css';
import CustomPopup from '../../components/CustomPopup/CustomPopup';
import { usePopup } from '../../context/PopupContext';

const PopupManager = ({ handleToggleFavorite, isEventFavorited }) => {
  const { popupInfo, closePopup } = usePopup();

  // Verifica si popupInfo y popupInfo.id están disponibles antes de usar isEventFavorited
  const isFavorited = popupInfo?.id ? isEventFavorited(popupInfo.id) : false;
 

  return (
    <>
      {popupInfo && (
        <CustomPopup
          popupInfo={popupInfo}
          onClose={closePopup}
          onToggleFavorite={() => {
            handleToggleFavorite(popupInfo)
          }}
          isFavorited={isFavorited}
        />
      )}
    </>
  );
};

export default PopupManager;
