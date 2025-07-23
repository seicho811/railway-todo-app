import { CheckIcon } from '~/icons/CheckIcon';
import { Button } from '~/components/Button';

export const MarkButton = ({
  handleToggle,
  handleFocus = () => {},
  handleBlur = () => {},
  isSubmitting = false,
  done,
  className,
}) => {
  return (
    <Button
      handleClick={handleToggle}
      className={`${className}__mark_button`}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
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
