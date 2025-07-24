import { useCallback, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './TaskCreateForm.css';
import { createTask } from '~/store/task';
import { SubmitButton } from './Button/SubmitButton';
import { DiscardButton } from '~/components/Button/DiscardButton';
import { MarkButton } from '~/components/Button/MarkButton';
import { TextArea } from './Form/TextArea';
import { Input } from '~/components/Form/Input';

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
          onClick={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          done={done}
        />
        <Input
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
            value={detail}
            placeholder={'Add a description here...'}
            className={'task_create_form__detail'}
            expandable={true}
            onChange={(e) => setDetail(e.target.value)}
            onBlur={handleBlur}
            disabled={formState === 'submitting'}
          />
          <div className="task_create_form__actions">
            <DiscardButton
              text={'Discard'}
              variant={'secondary'}
              onBlur={handleBlur}
              onClick={handleDiscard}
              disabled={(!title && !detail) || formState === 'submitting'}
            />
            <div className="task_create_form__spacer"></div>
            <SubmitButton
              text={'Add'}
              onBlur={handleBlur}
              disabled={!title || !detail || formState === 'submitting'}
            />
          </div>
        </div>
      )}
    </form>
  );
};
