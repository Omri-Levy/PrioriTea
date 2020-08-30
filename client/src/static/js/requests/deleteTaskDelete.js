import axios from 'axios';

const deleteTaskDelete = async (taskId, tasks, setTasks, setTasksCopy) => {

    const url = `${process.env.REACT_APP_API}/task/delete_task`;

    try {
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
