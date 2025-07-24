import { Button } from '~/components/Button/Button';

export const DiscardButton = ({
  text,
  variant,
  onBlur,
  onClick,
  disabled,
  className,
}) => {
  return (
    <Button
      text={text}
      variant={variant}
      className={className}
      onBlur={onBlur}
      onClick={onClick}
      disabled={disabled}
    />
  );
};
