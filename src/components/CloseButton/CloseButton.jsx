//CloseButton.jsx
import './CloseButton.css';

const CloseButton = ( { onClose } ) => {
     console.log("CloseButton Render");
     
     return (
          <button className="close-button" onClick={ onClose }>
               &times;
          </button>
     );
};

export default CloseButton;