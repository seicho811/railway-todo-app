import { Button } from '~/components/button/Button';

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
