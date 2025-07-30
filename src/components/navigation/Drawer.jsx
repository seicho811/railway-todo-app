import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Button } from '~/components/Button/Button';
import Title from './Title';
import './Drawer.css';

export const Drawer = ({ children, onClose }) => {
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
    <div className="drawer" data-open={open} onClick={handleOverlayClick}>
      <div className="drawer__header">
        <Title className="drawer__title" />
        <Button text="X" className="drawer__close" onClick={onClose} />
      </div>
      <div className="drawer__body" ref={modalRef}>
        {typeof children === 'function' ? children(onClose) : children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};
