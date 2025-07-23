import { Button } from '~/components/Button';

export const AddButton = ({ handleBlur, title, detail, formState }) => {
  return (
    <Button
      text="Add"
      type="submit"
      handleBlur={handleBlur}
      disabled={!title || !detail || formState === 'submitting'}
    />
  );
};
