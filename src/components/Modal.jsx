import { createPortal } from 'react-dom';
import './Modal.css';

export const Modal = ({ children, onClose }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
      <button className="modal-close" onClick={onClose}>
        Close
      </button>
    </div>,
    document.getElementById('modal-root')
  );
};
