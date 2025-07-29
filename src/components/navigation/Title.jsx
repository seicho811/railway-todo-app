import { Link } from 'react-router-dom';

const Title = ({ layout = 'desktop' }) => {
  const baseClass =
    layout === 'mobile' ? 'sidebar__title_mobile' : 'sidebar__title';
  return (
    <Link to="/">
      <h1 className={baseClass}>Todos</h1>
    </Link>
  );
};

export default Title;
