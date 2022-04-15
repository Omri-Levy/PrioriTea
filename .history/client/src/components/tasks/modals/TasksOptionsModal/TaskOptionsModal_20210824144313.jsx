import React, {useContext} from 'react';
import {LoadingContext} from '../../../context/LoadingContext.jsx';
import {ModalsContext} from '../../../context/ModalsContext.jsx';
import {TasksContext} from '../../../context/TasksContext.jsx';
import {persistFilter} from '../../../static/js/filter.js';
import {displayTaskOptionsTooltip, hideTaskOptionsTooltip}
    from '../../../static/js/handlers';
import fetchFn from '../../../static/js/requests/fetchFn.js';
import sortFn from '../../../static/js/sortFn.js';

const TaskOptionsModal = ({taskId, noTasks, invalidFilter}) => {
    const {setTasks, setTasksCopy, setEditTaskId} = useContext(
        TasksContext);
    const {openEditTaskModal, openCreateTaskModal} = useContext(ModalsContext);
    const {startLoading, stopLoading} = useContext(LoadingContext);
    const deleteTaskUrl = `${process.env.REACT_APP_API_TASK}/delete_task`;
    const getTasksUrl = `${process.env.REACT_APP_API_TASK}/get_tasks`;

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

                                const deleteTaskOptions = {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({_id: taskId}),
                                    credentials: 'include'
                                };

                                const getTasksOptions = {
                                    method: 'GET',
                                    credentials: 'include'
                                };

                                try {
                                    await fetchFn(deleteTaskUrl,
                                        deleteTaskOptions);

                                    const {data: resData} = await fetchFn(
                                        getTasksUrl, getTasksOptions);

                                    const filteredData = persistFilter(resData
                                    );
                                    const sortedData = sortFn(filteredData);

                                    setTasks(sortedData);
                                    setTasksCopy(sortedData);

                                } catch (err) {
                                    console.error(err);
                                }

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
