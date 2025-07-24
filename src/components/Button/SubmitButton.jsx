import { Button } from '~/components/Button/Button';

export function SubmitButton({ text, onBlur, disabled }) {
  return (
    <Button text={text} type="submit" onBlur={onBlur} disabled={disabled} />
  );
}
