import { useEffect } from 'react';
const useAriaHider = (inertSelectors) => {
  useEffect(() => {
    // set inert attribute to elements that should not be focusable
    const inertTargets = Array.from(document.querySelectorAll(inertSelectors));
    inertTargets.forEach((target) => target.setAttribute('inert', ''));

    return () => {
      // remove inert attribute when the component unmounts
      inertTargets.forEach((target) => target.removeAttribute('inert'));
      // or when the inertSelectors change
    };
  }, [inertSelectors]);
};

export default useAriaHider;
