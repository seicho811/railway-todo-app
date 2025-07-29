import useMediaQuery from '~/hooks/useMediaQuery';
import Title from '~/components/navigation/Title';

const HambergerMenu = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  document.documentElement.classList.add('modal_open');
  return <Title isMobile={isMobile} />;
};

export default HambergerMenu;
