import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import './Modal.css';

export const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
    ];

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      focusableSelectors.join(',')
    );
    const firstElement = focusableElements[0];
    const firstInputElement = modal.querySelector(
      'input:not([disabled])',
      'textarea(:not([disabled])'
    );
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      // Shift + Tab to go backwards
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab forward
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    firstInputElement?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalRef}>
        {children}
      </div>
      <button className="modal-close" onClick={onClose}>
        Close
      </button>
    </div>,
    document.getElementById('modal-root')
  );
};
