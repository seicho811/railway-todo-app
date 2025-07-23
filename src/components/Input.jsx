export const Input = ({ id, title, placeholder, handleChange }) => {
  return (
    <input
      id={`${id}-title`}
      className="app_input"
      placeholder={placeholder}
      value={title}
      onChange={handleChange}
    />
  );
};
