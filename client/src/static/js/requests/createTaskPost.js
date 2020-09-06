import getTasksGet from './getTasksGet.js';

const createTaskPost = async (data, setTasks, setTasksCopy,
                              closeCreateTaskModal) => {
    const url = `${process.env.REACT_APP_API_TASK}/create_task`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            priority: data.priority,
            task: data.task
        }),
        credentials: 'include'
    };

    try {
        await fetch(url, options);
        await getTasksGet(setTasks, setTasksCopy);
        closeCreateTaskModal();
    } catch (err) {
        console.error(err);
    }
}

export default createTaskPost;
