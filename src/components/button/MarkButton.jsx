import { CheckIcon } from '~/icons/CheckIcon';
import { Button } from '~/components/button/Button';

export const MarkButton = ({
  onClick,
  done,
  className,
  onFocus = () => {},
  onBlur = () => {},
  isSubmitting = false,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`${className}__mark_button`}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={isSubmitting}
    >
      {done ? (
        <div
          className={`${className}__mark____complete`}
          aria-label="Completed"
        >
          <CheckIcon className={`${className}__mark____complete_check`} />
        </div>
      ) : (
        <div
          className={`${className}__mark____incomplete`}
          aria-label="Incomplete"
        ></div>
      )}
    </Button>
  );
};
