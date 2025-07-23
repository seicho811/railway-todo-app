import { ChevronIcon } from '~/icons/ChevronIcon';
import './BackButton.css';
import { Button } from '~/components/Button';

const handleClick = () => {
  window.history.back();
};

export const BackButton = () => {
  return (
    <Button handleClick={handleClick} className="back_button">
      <ChevronIcon className="back_button__icon" />
      Back
    </Button>
  );
};
