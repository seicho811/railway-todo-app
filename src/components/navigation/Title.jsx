import { Link } from 'react-router-dom';

const Title = ({ isMobile = false }) => {
  const baseClass = isMobile ? 'sidebar__title_mobile' : 'sidebar__title';
  return (
    <Link to="/">
      <h1 className={baseClass}>Todos</h1>
    </Link>
  );
};

export default Title;
