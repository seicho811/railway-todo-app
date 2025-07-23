import { useCallback, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './TaskCreateForm.css';
import { createTask } from '~/store/task';
import { AddButton } from '~/components/AddButton';
import { DiscardButton } from '~/components/DiscardButton';
import { MarkButton } from '~/components/MarkButton';
import { TextArea } from './TextArea';

export const TaskCreateForm = () => {
  const dispatch = useDispatch();

  const refForm = useRef(null);

  const [formState, setFormState] = useState('initial');

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [done, setDone] = useState(false);

  const handleFocus = useCallback(() => {
    setFormState('focused');
  }, []);

  const handleBlur = useCallback(() => {
    if (title || detail) {
      return;
    }

    setTimeout(() => {
      // フォーム内の要素がフォーカスされている場合は何もしない
      const formElement = refForm.current;
      if (formElement && formElement.contains(document.activeElement)) {
        return;
      }

      setFormState('initial');
      setDone(false);
    }, 100);
  }, [title, detail]);

  const handleToggle = useCallback(() => {
    setDone((prev) => !prev);
  }, []);

  const handleDiscard = useCallback(() => {
    setTitle('');
    setDetail('');
    setFormState('initial');
    setDone(false);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setFormState('submitting');

      void dispatch(createTask({ title, detail, done }))
        .unwrap()
        .then(() => {
          handleDiscard();
        })
        .catch((err) => {
          alert(err.message);
          setFormState('focused');
        });
    },
    [title, detail, done]
  );

  return (
    <form
      ref={refForm}
      className="task_create_form"
      onSubmit={onSubmit}
      data-state={formState}
    >
      <div className="task_create_form__title_container">
        <MarkButton
          className={'task_create_form'}
          handleToggle={handleToggle}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          done={done}
        />
        <input
          type="text"
          className="task_create_form__title"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={formState === 'submitting'}
        />
      </div>
      {formState !== 'initial' && (
        <div>
          <TextArea
            detail={detail}
            placeholder={'Add a description here...'}
            className={'task_create_form__detail'}
            expandable={true}
            handleChange={(e) => setDetail(e.target.value)}
            handleBlur={handleBlur}
            formState={formState}
          />
          <div className="task_create_form__actions">
            <DiscardButton
              handleBlur={handleBlur}
              handleDiscard={handleDiscard}
              disabled={(!title && !detail) || formState === 'submitting'}
            />
            <div className="task_create_form__spacer"></div>
            <AddButton
              handleBlur={handleBlur}
              title={title}
              detail={detail}
              formState={formState}
            />
          </div>
        </div>
      )}
    </form>
  );
};
