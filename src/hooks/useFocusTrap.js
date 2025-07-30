import { useEffect } from 'react';

const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
];

const useFocusTrap = (
  modalRef,
  onClose,
  lockBodyScroll = true,
  inertSelectors = 'main'
) => {
  useEffect(() => {
    const modal = modalRef.current;

    // set inert attribute to elements that should not be focusable
    const inertTargets = Array.from(document.querySelectorAll(inertSelectors));
    inertTargets.forEach((target) => target.setAttribute('inert', ''));

    // if lockBodyScroll is true, prevent body scroll
    const prevOverflow = document.body.style.overflow;
    if (lockBodyScroll) document.body.style.overflow = 'hidden';

    const focusableElements = modal.querySelectorAll(
      focusableSelectors.join(',')
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    firstElement?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
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

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      inertTargets.forEach((target) => target.removeAttribute('inert'));
      if (lockBodyScroll) {
        document.body.style.overflow = prevOverflow;
      }
    };
  }, [modalRef, onClose, lockBodyScroll, inertSelectors]);
};

export default useFocusTrap;
