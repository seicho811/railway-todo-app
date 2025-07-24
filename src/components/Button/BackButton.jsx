import { ChevronIcon } from '~/icons/ChevronIcon';
import './BackButton.css';
import { Button } from '~/components/Button/Button';

const onClick = () => {
  window.history.back();
};

export const BackButton = () => {
  return (
    <Button onClick={onClick} className="back_button">
      <ChevronIcon className="back_button__icon" />
      Back
    </Button>
  );
};
