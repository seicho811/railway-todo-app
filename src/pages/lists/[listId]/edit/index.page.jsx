import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from '~/components/Button/BackButton';
import { SubmitButton } from '~/components/Button/SubmitButton';
import { Input } from '~/components/Form/Input';
import './index.css';
import { fetchLists, updateList, deleteList } from '~/store/list';
import { useId } from '~/hooks/useId';
import { DiscardButton } from '~/components/Button/DiscardButton';

const EditList = () => {
  const id = useId();

  const { listId } = useParams();
  const navigate = useNavigate();
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
          navigate(`/lists/${listId}`);
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

    setIsSubmitting(true);

    void dispatch(deleteList({ id: listId }))
      .unwrap()
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  return (
    <main className="edit_list">
      <BackButton />
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
          <Link to="/" data-variant="secondary" className="app_button">
            Cancel
          </Link>
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

export default EditList;
