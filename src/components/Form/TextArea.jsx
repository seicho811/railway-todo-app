import { useState, useEffect } from 'react';

export const TextArea = ({
  value,
  onChange,
  placeholder,
  id = null,
  className = null,
  rows = null,
  expandable = false,
  onBlur = () => {},
  disabled = false,
}) => {
  const [elemTextarea, setElemTextarea] = useState(null);

  useEffect(() => {
    if (!elemTextarea) {
      return;
    }

    const recalcHeight = () => {
      elemTextarea.style.height = 'auto';
      elemTextarea.style.height = `${elemTextarea.scrollHeight}px`;
    };

    elemTextarea.addEventListener('input', recalcHeight);
    recalcHeight();

    return () => {
      elemTextarea.removeEventListener('input', recalcHeight);
    };
  }, [elemTextarea]);
  return (
    <textarea
      id={id ? `${id}-detail` : undefined}
      ref={expandable ? setElemTextarea : () => {}}
      rows={rows ?? 1}
      className={className ?? 'app_input'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
};
