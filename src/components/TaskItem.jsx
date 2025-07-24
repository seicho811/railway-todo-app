import { useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PencilIcon } from '~/icons/PencilIcon';
import { updateTask } from '~/store/task';
import './TaskItem.css';
import { MarkButton } from './button/MarkButton';

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const { listId } = useParams();
  const { id, title, detail, done } = task;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done]);

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <MarkButton
          handleToggle={handleToggle}
          className={'task_item'}
          isSubmitting={isSubmitting}
          done={done}
        />
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <Link
          to={`/lists/${listId}/tasks/${id}`}
          className="task_item__title_action"
        >
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className="task_item__detail">{detail}</div>
    </div>
  );
};
