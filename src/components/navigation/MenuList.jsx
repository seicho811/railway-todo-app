import { Link } from 'react-router-dom';
import { ListIcon } from '~/icons/ListIcon';
import { PlusIcon } from '~/icons/PlusIcon';
import './MenuList.css';

const MenuList = ({
  lists,
  activeId,
  layout = 'desktop',
  shouldHighlight = false,
  onClose = () => {},
}) => {
  if (!lists) return;

  const baseClass =
    layout == 'mobile' ? 'sidebar__lists_mobile' : 'sidebar__lists';
  return (
    <>
      <div className={`${baseClass}`}>
        <h2 className={`${baseClass}_title`}>Lists</h2>
        <ul className={`${baseClass}_items`}>
          {lists.map((listItem) => (
            <li key={listItem.id}>
              <div onClick={onClose}>
                <Link
                  data-active={shouldHighlight && listItem.id === activeId}
                  to={`/lists/${listItem.id}`}
                  className={`${baseClass}_item`}
                >
                  <ListIcon aria-hidden className={`${baseClass}_icon`} />
                  {listItem.title}
                </Link>
              </div>
            </li>
          ))}
          <li>
            <div onClick={onClose}>
              <Link to="/list/new" className={`${baseClass}_button`}>
                <PlusIcon className={`${baseClass}_plus_icon`} />
                New List...
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuList;
