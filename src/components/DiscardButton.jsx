import { Button } from '~/components/Button';

export const DiscardButton = ({ handleBlur, handleDiscard, disabled }) => {
  return (
    <Button
      text="Discard"
      variant="secondary"
      handleBlur={handleBlur}
      handleClick={handleDiscard}
      disabled={disabled}
    />
  );
};
