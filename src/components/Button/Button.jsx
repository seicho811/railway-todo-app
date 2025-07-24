import './Button.css';

export const Button = ({
  text,
  children,
  className = 'app_button',
  type = 'button',
  variant = '',
  onClick = () => {},
  onFocus = () => {},
  onBlur = () => {},
  disabled = false,
}) => {
  return (
    <button
      className={className}
      type={type}
      data-variant={variant}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
    >
      {children}
      {text}
    </button>
  );
};
