import { useEffect } from 'react';

const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
];

const useFocusTrap = (modalRef, onClose) => {
  useEffect(() => {
    const modal = modalRef.current;

    const focusableElements = modal.querySelectorAll(
      focusableSelectors.join(',')
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    firstElement?.focus();

    const handleKeyDown = (event) => {
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
    };
  }, [modalRef, onClose]);
};

export default useFocusTrap;
