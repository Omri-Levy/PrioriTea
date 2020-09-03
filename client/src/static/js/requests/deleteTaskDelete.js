import getTasksGet from './getTasksGet.js';

const deleteTaskDelete = async (taskId, setTasks, setTasksCopy, sort) => {

    const url = `${process.env.REACT_APP_API_TASK}/delete_task`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: taskId}),
        credentials: 'include'
    };

    try {
        await fetch(url, options);
        await getTasksGet(setTasks, setTasksCopy, sort);
    } catch (err) {
        console.error(err);
    }
};

export default deleteTaskDelete;
