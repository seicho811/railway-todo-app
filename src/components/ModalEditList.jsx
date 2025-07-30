import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '~/components/Button/Button';
import { BackButton } from '~/components/Button/BackButton';
import { SubmitButton } from '~/components/Button/SubmitButton';
import { Input } from '~/components/Form/Input';
import { fetchLists, updateList, deleteList } from '~/store/list';
import { useId } from '~/hooks/useId';
import { DiscardButton } from '~/components/Button/DiscardButton';
import './ModalEditList.css';

const ModalEditList = ({ handleClose }) => {
  const id = useId();

  const { listId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const list = useSelector((state) =>
    state.list.lists?.find((list) => list.id === listId)
  );

  useEffect(() => {
    if (list) {
      setTitle(list.title);
    }
  }, [list]);

  useEffect(() => {
    void dispatch(fetchLists());
  }, [listId]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      void dispatch(updateList({ id: listId, title }))
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
    [title, listId]
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this list?')) {
      return;
    }

    handleClose();
    void dispatch(deleteList({ id: listId }))
      .unwrap()
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, []);

  return (
    <main className="edit_list">
      <BackButton onClick={handleClose} />
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Name
          </label>
          <Input
            id={id}
            value={title}
            placeholder={'Family'}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <div className="edit_list__form_actions">
          <Button text={'Cancel'} variant="secondary" onClick={handleClose} />
          <div className="edit_list__form_actions_spacer"></div>
          <DiscardButton
            text={'Delete'}
            className={'app_button edit_list__form_actions_delete'}
            disabled={isSubmitting}
            onClick={handleDelete}
          />
          <SubmitButton text={'Update'} disabled={isSubmitting} />
        </div>
      </form>
    </main>
  );
};

export default ModalEditList;
