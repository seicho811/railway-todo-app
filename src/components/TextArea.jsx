import { useState, useEffect } from 'react';

export const TextArea = ({
  detail,
  handleChange,
  placeholder,
  className,
  id = null,
  rows = null,
  expandable = false,
  handleBlur = () => {},
  formState = '',
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
      className={className}
      placeholder={placeholder}
      value={detail}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={formState === 'submitting'}
    />
  );
};
