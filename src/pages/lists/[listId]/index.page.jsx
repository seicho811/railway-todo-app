import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TaskItem } from '~/components/TaskItem';
import { TaskCreateForm } from '~/components/TaskCreateForm';
import { setCurrentList } from '~/store/list';
import { fetchTasks } from '~/store/task';
import { Button } from '~/components/Button/Button';
import './index.css';
import { Modal } from '~/components/Modal';
import ModalEditTask from '~/components/ModalEditTask';
import ModalEditList from '~/components/ModalEditList';
import useMediaQuery from '~/hooks/useMediaQuery';
import { PencilIcon } from '~/icons/PencilIcon';

const ListIndex = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const dispatch = useDispatch();
  const { listId } = useParams();

  const isMobile = useMediaQuery('(max-width: 768px)');

  const isLoading = useSelector(
    (state) => state.task.isLoading || state.list.isLoading
  );

  const tasks = useSelector((state) => state.task.tasks);
  const listName = useSelector((state) => {
    const currentId = state.list.current;
    const list = state.list.lists?.find((list) => list.id === currentId);
    return list?.title;
  });
  const incompleteTasksCount = useSelector((state) => {
    return state.task.tasks?.filter((task) => !task.done).length;
  });

  useEffect(() => {
    dispatch(setCurrentList(listId));
    dispatch(fetchTasks()).unwrap();
  }, [listId]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="tasks_list">
      <div className="tasks_list__title">
        {listName}
        {incompleteTasksCount > 0 && (
          <span className="tasks_list__title__count">
            {incompleteTasksCount}
          </span>
        )}
        <div className="tasks_list__title_spacer"></div>
        {isMobile ? (
          <button onClick={() => setIsModalOpen(true)}>
            <PencilIcon />
          </button>
        ) : (
          <Button text="Edit..." onClick={() => setIsModalOpen(true)} />
        )}
      </div>
      <div className="tasks_list__items">
        <TaskCreateForm />
        {tasks?.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              onClick={() => {
                setIsModalOpen(true);
                setSelectedTaskId(task.id);
              }}
            />
          );
        })}
        {tasks?.length === 0 && (
          <div className="tasks_list__items__empty">No tasks yet!</div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTaskId(null);
          }}
        >
          {selectedTaskId ? (
            <ModalEditTask
              taskId={selectedTaskId}
              handleClose={() => {
                (setIsModalOpen(false), setSelectedTaskId(null));
              }}
            />
          ) : (
            <ModalEditList handleClose={() => setIsModalOpen(false)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ListIndex;
