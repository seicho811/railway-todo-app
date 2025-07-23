import './Button.css';

export const Button = ({
  text,
  children,
  className = 'app_button',
  type = 'button',
  variant = '',
  handleClick = () => {},
  handleFocus = () => {},
  handleBlur = () => {},
  disabled = false,
}) => {
  return (
    <button
      className={className}
      type={type}
      data-variant={variant}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
    >
      {children}
      {text}
    </button>
  );
};
