//CloseButton.jsx
import './CloseButton.css';

const CloseButton = ( { onClose } ) => {
     return (
          <button className="close-button" onClick={ onClose }>
               &times;
          </button>
     );
};

export default CloseButton;