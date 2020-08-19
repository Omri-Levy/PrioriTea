import axios from 'axios';

const deleteTaskDelete = async (taskId, tasks, setTasks, setTasksCopy) => {
    try {
        const url = 'http://localhost:4000/api/task/delete_task';
        const res = await axios.delete(url, {data: {_id: taskId}});
        console.log(res);
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
        setTasksCopy(updatedTasks);
    } catch (err) {
        console.error(err);
    }
}

export default deleteTaskDelete;
