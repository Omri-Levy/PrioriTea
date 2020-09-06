import React, {useContext} from 'react';
import {LoadingContext} from '../../../context/LoadingContext.jsx';
import {ModalsContext} from '../../../context/ModalsContext.jsx';
import {TasksContext} from '../../../context/TasksContext.jsx';
import {displayTaskOptionsTooltip, hideTaskOptionsTooltip}
    from '../../../static/js/handlers';
import deleteTaskDelete from '../../../static/js/requests/deleteTaskDelete';

const TaskOptionsModal = ({taskId, noTasks, invalidFilter}) => {
    const {setTasks, setTasksCopy, setEditTaskId} = useContext(
        TasksContext);
    const {openEditTaskModal, openCreateTaskModal} = useContext(ModalsContext);
    const {startLoading, stopLoading} = useContext(LoadingContext);

    const editTask = () => {
        openEditTaskModal();
        setEditTaskId(taskId);
    }

    const invalidFilterOrNoTasks = (action) => {
        if (noTasks) {
            return action === 'edit' ? 'Edit Is Unavailable On Draft'
                : 'Delete Is Unavailable On Draft'
        } else if (invalidFilter) {
            const editMessage = 'Edit Is Unavailable With Invalid Filter';
            const deleteMessage = 'Delete Is Unavailable With Invalid Filter';
            return action === 'edit' ? editMessage : deleteMessage;
        } else {
            return action === 'edit' ? 'Edit' : 'Delete';
        }
    };

    return (
        <>
            <em
                title='Options'
                onMouseEnter={displayTaskOptionsTooltip}
                onMouseLeave={hideTaskOptionsTooltip}
                className={
                    'task-options-tooltip-btn highlight-me'}>
                <div className='task-options-modal hidden'>
                    <em
                        title='Create'
                        onClick={openCreateTaskModal}
                        className='create-task-btn'
                    />
                    <em
                        title={invalidFilterOrNoTasks('edit')}
                        onClick={noTasks || invalidFilter ? null : editTask}
                        className={noTasks || invalidFilter
                            ? 'edit-task-btn excluded-link draft'
                            : 'edit-task-btn'}/>
                    <em
                        title={invalidFilterOrNoTasks('delete')}
                        onClick={noTasks || invalidFilter ? null
                            : async () => {
                            startLoading();
                                await deleteTaskDelete(taskId, setTasks,
                                    setTasksCopy);
                                stopLoading();
                            }
                        }
                        className={noTasks || invalidFilter
                            ? 'delete-task-btn excluded-link draft'
                            : 'delete-task-btn'}
                    />
                </div>
            </em>
        </>
    );
};

export default TaskOptionsModal;
