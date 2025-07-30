import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PencilIcon } from '~/icons/PencilIcon';
import { updateTask } from '~/store/task';
import './TaskItem.css';
import { MarkButton } from './Button/MarkButton';
import { formatUtcStringToJst, getJSTDate } from '~/utils/dateUtils';

const getLimitGap = (limit) => {
  const todayJST = getJSTDate();
  const limitJST = getJSTDate(new Date(limit));
  const gap = limitJST.getTime() - todayJST.getTime();
  const gapDays = Math.ceil(gap / (1000 * 60 * 60 * 24));
  if (gapDays > 0) {
    return `${gapDays}日後`;
  }
  if (gapDays === 0) {
    return '今日中';
  }
  return `${Math.abs(gapDays)}日超過`;
};

export const TaskItem = ({ task, onClick }) => {
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

  const isOverdue = limit && getJSTDate(new Date(limit)) < getJSTDate();

  const formattedLimit = limit ? formatUtcStringToJst(limit) : '';

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
        <div className="task_item__title_action" onClick={onClick}>
          <PencilIcon aria-label="Edit" />
        </div>
      </div>
      <div className="task_item__detail">{detail}</div>
      {limit ? (
        <div
          className="task_item__limit"
          style={isOverdue ? { color: 'red' } : undefined}
        >
          <span className="task_item__limit_gap">{`Due: [${getLimitGap(limit)}]`}</span>
          <time dateTime={limit}>{formattedLimit}</time>
        </div>
      ) : (
        <div className="task_item__no_limit">
          <span>期限なし</span>
        </div>
      )}
    </div>
  );
};
