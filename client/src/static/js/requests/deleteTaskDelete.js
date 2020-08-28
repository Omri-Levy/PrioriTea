import axios from 'axios';

const deleteTaskDelete = async (taskId, tasks, setTasks, setTasksCopy) => {
    try {
        const url = 'http://localhost:4000/api/task/delete_task';

        await axios.delete(url, {
            data: {_id: taskId},
            withCredentials: true
        });

        const updatedTasks = tasks.filter(task => task._id !== taskId);

        setTasks(updatedTasks);
        setTasksCopy(updatedTasks);

    } catch (err) {
        console.error(err);
    }
};

export default deleteTaskDelete;
