import { Link } from 'react-router-dom';

const Login = ({ layout = 'desktop' }) => {
  const baseClass =
    layout === 'mobile' ? 'sidebar__login_mobile' : 'sidebar__login';
  return (
    <>
      <Link to="/signin" className={baseClass}>
        Login
      </Link>
    </>
  );
};

export default Login;
