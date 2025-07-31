import { Button } from '~/components/Button/Button';
import { PencilIcon } from '~/icons/PencilIcon';
import './TaskListTitle.css';

const TaskListTitle = ({ listName, incompleteTasksCount, isMobile }) => {
  const baseClass = isMobile ? 'tasks_list_mobile' : 'tasks_list';
  return (
    <>
      <div className={`${baseClass}__title`}>
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
    </>
  );
};

export { TaskListTitle };
