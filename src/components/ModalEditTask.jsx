import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '~/components/Button/Button';
import { BackButton } from '~/components/Button/BackButton';
import { DiscardButton } from '~/components/Button/DiscardButton';
import { SubmitButton } from '~/components/Button/SubmitButton';
import { Input } from '~/components/Form/Input';
import { TextArea } from '~/components/Form/TextArea';
import { updateTask, deleteTask } from '~/store/task';
import { useId } from '~/hooks/useId';
import './ModalEditTask.css';

const ModalEditTask = ({ taskId, handleClose }) => {
  const id = useId();
  const { listId } = useParams();

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [done, setDone] = useState(false);
  const [limit, setLimit] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector((state) =>
    state.task.tasks?.find((task) => task.id === taskId)
  );

  useEffect(() => {
    if (!task) {
      return;
    }
    //LimitがUndefinedの場合か確認して初期化
    const initialLimit = task.limit
      ? new Date(task.limit)
          .toLocaleDateString('ja-JP', {
            timeZone: 'Asia/Tokyo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          .replace(/\//g, '-')
          .replace(' ', 'T')
      : '';

    if (task) {
      setTitle(task.title);
      setDetail(task.detail);
      setDone(task.done);
      setLimit(initialLimit);
    }
  }, [task]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsSubmitting(true);

      const isoLimit = limit ? new Date(limit).toISOString() : null;

      void dispatch(
        updateTask({ id: taskId, title, detail, done, limit: isoLimit })
      )
        .unwrap()
        .then(() => {
          handleClose();
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, taskId, listId, detail, done, limit]
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    handleClose();

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, [taskId]);

  return (
    <main className="edit_task">
      <BackButton onClick={handleClose} />
      <h2 className="edit_task__title">Edit Task</h2>
      <p className="edit_task__error">{errorMessage}</p>
      <form className="edit_task__form" onSubmit={onSubmit}>
        <fieldset className="edit_task__form_field">
          <label htmlFor={`${id}-title`} className="edit_task__form_label">
            Title
          </label>
          <Input
            id={id}
            value={title}
            placeholder={'Buy some milk'}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_task__form_field">
          <label htmlFor={`${id}-detail`} className="edit_task__form_label">
            Description
          </label>
          <TextArea
            id={id}
            placeholder={'Blah blah blah'}
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_task__form_field">
          <label htmlFor={`${id}-duedate`}>Due data</label>
          <Input
            type="datetime-local"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_task__form_field">
          <label htmlFor={`${id}-done`} className="edit_task__form_label">
            Is Done
          </label>
          <div>
            <input
              id={`${id}-done`}
              type="checkbox"
              checked={done}
              onChange={(event) => setDone(event.target.checked)}
            />
          </div>
        </fieldset>
        <div className="edit_task__form_actions">
          <Button text="Cancel" variant="secondary" onClick={handleClose} />
          <div className="edit_task__form_actions_spacer"></div>
          <DiscardButton
            text="Delete"
            className="app_button edit_task__form_actions_delete"
            disabled={isSubmitting}
            onClick={handleDelete}
          />
          <SubmitButton text="Update" />
        </div>
      </form>
    </main>
  );
};

export default ModalEditTask;
