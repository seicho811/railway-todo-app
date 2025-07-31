import { useEffect } from 'react';

const useOverlayDismiss = ({ onDismiss }) => {
  const onOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onDismiss();
    }
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onDismiss();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onDismiss]);

  return {
    onOverlayClick,
  };
};

export default useOverlayDismiss;
