import { Button } from '~/components/Button';

export function SubmitButton({ text, isSubmitting }) {
  return <Button text={text} type="submit" disabled={isSubmitting} />;
}
