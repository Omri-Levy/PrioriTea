import getTasksGet from './getTasksGet.js';

const editTaskPatch = async (data, editTaskId, tasks, setTasks, setTasksCopy,
                             closeEditTaskModal) => {
    const url = `${process.env.REACT_APP_API_TASK}/edit_task`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: editTaskId,
            priority: data.priority,
            task: data.task,
            status: data.status
        }),
        credentials: 'include'
    };

    try {
        await fetch(url, options);
        await getTasksGet(setTasks, setTasksCopy);
        closeEditTaskModal();

    } catch (err) {
        console.error(err);
    }
};

export default editTaskPatch;
