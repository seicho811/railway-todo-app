import { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listner = () => setMatches(media.matches);
    media.addEventListener('change', listner);
    return () => media.removeEventListener('change', listner);
  }, [query]);

  return matches;
};

export default useMediaQuery;
