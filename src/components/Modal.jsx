import { createPortal } from 'react-dom';
import { useRef } from 'react';
import useFocusTrap from '~/hooks/useFocusTrap';
import useOverlayDismiss from '~/hooks/useOverlayDismiss';
import useScrollLock from '~/hooks/useScrollLock';
import useAriaHider from '~/hooks/useAriaHider';
import './Modal.css';

export const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);

  useFocusTrap(modalRef, onClose, true, 'main');
  useScrollLock(true);
  useAriaHider('main');
  const { onOverlayClick } = useOverlayDismiss({ onDismiss: onClose });

  return createPortal(
    <div className="modal-overlay" onClick={onOverlayClick}>
      <div className="modal-content" ref={modalRef}>
        {typeof children === 'function' ? children(onClose) : children}
      </div>
      <button className="modal-close" onClick={onClose}>
        Close
      </button>
    </div>,
    document.getElementById('modal-root')
  );
};
