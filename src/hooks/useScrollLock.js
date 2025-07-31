import { useEffect } from 'react';

const useScrollLock = (lockBodyScroll = true) => {
  useEffect(() => {
    // if lockBodyScroll is true, prevent body scroll
    const prevOverflow = document.body.style.overflow;
    if (lockBodyScroll) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lockBodyScroll]);
};

export default useScrollLock;
