const AccountSection = ({ userName, logout, layout = 'desktop' }) => {
  const baseClass =
    layout === 'mobile' ? 'sidebar__account_mobile' : 'sidebar__account';
  return (
    <div className={baseClass}>
      <p className={`${baseClass}_name`}>{userName}</p>
      <button type="button" className={`${baseClass}_logout`} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AccountSection;
