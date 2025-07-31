import { createPortal } from 'react-dom';
import { useRef } from 'react';
import { Button } from '~/components/Button/Button';
import Title from './Title';
import './Drawer.css';
import useFocusTrap from '~/hooks/useFocusTrap';
import useOverlayDismiss from '~/hooks/useOverlayDismiss';
import useScrollLock from '~/hooks/useScrollLock';
import useAriaHider from '~/hooks/useAriaHider';

export const Drawer = ({ children, onClose, open }) => {
  const modalRef = useRef(null);

  useFocusTrap(modalRef, onClose);
  useScrollLock(true);
  useAriaHider('main');

  const { onOverlayClick } = useOverlayDismiss({ onDismiss: onClose });

  return createPortal(
    <>
      <div className="backdrop" data-open={open} onClick={onOverlayClick} />
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
