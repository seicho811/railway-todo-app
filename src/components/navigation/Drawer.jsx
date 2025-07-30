import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Button } from '~/components/Button/Button';
import Title from './Title';
import './Drawer.css';
import useFocusTrap from '~/hooks/useFocusTrap';

export const Drawer = ({ children, onClose, open }) => {
  const modalRef = useRef(null);

  useFocusTrap(modalRef, onClose);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <>
      <div className="backdrop" data-open={open} onClick={handleOverlayClick} />
      <div className="drawer" ref={modalRef} data-open={open}>
        <div className="drawer__header">
          <Title className="drawer__title" />
          <Button text="X" className="drawer__close" onClick={onClose} />
        </div>
        <div className="drawer__body" ref={modalRef}>
          {typeof children === 'function' ? children(onClose) : children}
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
};
