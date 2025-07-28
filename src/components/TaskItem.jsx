import { useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PencilIcon } from '~/icons/PencilIcon';
import { updateTask } from '~/store/task';
import './TaskItem.css';
import { MarkButton } from './Button/MarkButton';

const getLimitGap = (limit) => {
  const today = new Date();
  const limitDate = new Date(limit);
  const gap = limitDate.getTime() - today.getTime();
  const gapDays = Math.ceil(gap / (1000 * 60 * 60 * 24));
  if (gapDays > 0) {
    return `${gapDays}日後`;
  }
  if (gapDays === 0) {
    return '今日中';
  }
  return `${Math.abs(gapDays)}日超過`;
};

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const { listId } = useParams();
  const { id, title, detail, done, limit } = task;

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
          onClick={handleToggle}
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
      {limit ? (
        <div className="task_item__limit">
          <time dateTime={limit}>{limit.slice(0, 16).replace('T', ' ')}</time>
          <span className="task_item__limit_gap">{`: ${getLimitGap(limit)}`}</span>
        </div>
      ) : (
        <span>期限なし</span>
      )}
    </div>
  );
};
