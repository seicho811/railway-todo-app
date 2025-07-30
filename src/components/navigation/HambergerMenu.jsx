import { useSelector } from 'react-redux';
import useMediaQuery from '~/hooks/useMediaQuery';
import MenuList from '~/components/navigation/MenuList';
import AccountSection from './AccountSection';
import Login from './Login';

const HambergerMenu = ({ lists, activeId, shouldHighlight, onClose }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isLoggedIn = useSelector((state) => state.auth.token !== null);

  if (!lists) return null;

  if (!isLoggedIn) {
    return <Login isMobile={isMobile} />;
  }

  return (
    <>
      <MenuList
        lists={lists}
        activeId={activeId}
        shouldHighlight={shouldHighlight}
        layout={isMobile ? 'mobile' : 'desktop'}
        onClose={onClose}
      />
      <AccountSection isMobile={isMobile} />
    </>
  );
};

export default HambergerMenu;
