import './Sidebar.css';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogout } from '~/hooks/useLogout';
import { useEffect, useState } from 'react';
import { fetchLists } from '~/store/list/index';
import Title from '~/components/navigation/Title';
import MenuList from '~/components/navigation/MenuList';
import AccountSection from './AccountSection';
import Login from './Login';
import useMediaQuuery from '~/hooks/useMediaQuery';
import HambergerMenu from './HambergerMenu';
import HambergerIcon from '~/icons/HambergerIcon';
import { Drawer } from '~/components/navigation/Drawer';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isMobile = useMediaQuuery('(max-width: 768px)');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lists = useSelector((state) => state.list.lists);
  const activeId = useSelector((state) => state.list.current);
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const userName = useSelector((state) => state.auth.user?.name);

  // リスト新規作成ページではリストをハイライトしない
  const shouldHighlight = !pathname.startsWith('/list/new');

  const { logout } = useLogout();

  useEffect(() => {
    void dispatch(fetchLists());
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="sidebar">
        <Title />
        <Login />
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <button
            className="hamburger__toggle"
            onClick={() => setIsModalOpen(true)}
          >
            <HambergerIcon />
          </button>
          {isModalOpen && (
            <>
              <Drawer open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {(onClose) => (
                  <HambergerMenu
                    lists={lists}
                    activeId={activeId}
                    shouldHighlight={shouldHighlight}
                    onClose={onClose}
                  />
                )}
              </Drawer>
            </>
          )}
        </>
      ) : (
        <div className="sidebar">
          <Title />
          <MenuList
            lists={lists}
            activeId={activeId}
            shouldHighlight={shouldHighlight}
          />
          <div className="sidebar__spacer" aria-hidden />
          <AccountSection userName={userName} logout={logout} />
        </div>
      )}
    </>
  );
};
