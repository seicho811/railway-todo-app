import { useEffect } from 'react';
const useAriaHider = () => {
  useEffect(() => {
    // set inert attribute to elements that should not be focusable
    const inertTargets = Array.from(document.getElementById('root'));
    inertTargets.forEach((target) => target.setAttribute('inert', ''));

    return () => {
      // remove inert attribute when the component unmounts
      inertTargets.forEach((target) => target.removeAttribute('inert'));
      // or when the inertSelectors change
    };
  }, []);
};

export default useAriaHider;
