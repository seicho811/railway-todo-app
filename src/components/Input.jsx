export const Input = ({
  value,
  placeholder,
  id = null,
  className = null,
  handleChange = () => {},
  handleFocus = () => {},
  handleBlur = () => {},
  disabled = false,
}) => {
  return (
    <input
      id={id ? `${id}-title` : undefined}
      className={className ?? 'app_input'}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
    />
  );
};
