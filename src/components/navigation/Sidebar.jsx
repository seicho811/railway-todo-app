import './Sidebar.css';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogout } from '~/hooks/useLogout';
import { useEffect } from 'react';
import { fetchLists } from '~/store/list/index';
import Title from '~/components/navigation/Title';
import MenuList from '~/components/navigation/MenuList';
import AccountSection from './AccountSection';
import Login from './Login';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

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
  );
};
