// PopupManager.jsx

import React, { useMemo } from 'react';
import './PopupManager.css';
import CustomPopup from '../../components/CustomPopup/CustomPopup';
import { usePopup } from '../../context/PopupContext';

const PopupManager = React.memo(({ handleToggleFavorite, isEventFavorited }) => {
    console.log("PopupManager component render");
    const { popupInfo, closePopup } = usePopup();

    const isFavorited = useMemo(() => popupInfo?.id ? isEventFavorited(popupInfo.id) : false, [popupInfo, isEventFavorited]);

    if (!popupInfo) return null;

    return (
        <>
            {popupInfo && (
                <CustomPopup
                    popupInfo={popupInfo}
                    onClose={closePopup}
                    onToggleFavorite={() => handleToggleFavorite(popupInfo)}
                    isFavorited={isFavorited}
                />
            )}
        </>
    );
});

export default PopupManager;
