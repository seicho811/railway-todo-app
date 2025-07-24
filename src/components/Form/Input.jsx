import './Input.css';

export const Input = ({
  value,
  placeholder,
  id = null,
  className = null,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  disabled = false,
}) => {
  return (
    <input
      id={id ? `${id}-title` : undefined}
      className={className ?? 'app_input'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
};
