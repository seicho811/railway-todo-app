import { Button } from '~/components/button/Button';

export const DiscardButton = ({
  text,
  variant,
  handleBlur,
  handleClick,
  disabled,
  className,
}) => {
  return (
    <Button
      text={text}
      variant={variant}
      className={className}
      handleBlur={handleBlur}
      handleClick={handleClick}
      disabled={disabled}
    />
  );
};
