import axios from 'axios';

const deleteTaskDelete = async (id, tasksOriginal, setTasksOriginal) => {
    try {
        const url = 'http://localhost:4000/api/task/delete_task';
        const res = await axios.delete(url, {data: {_id: id}});
        console.log(res);
        setTasksOriginal(tasksOriginal.filter(task => task._id !== id));
    } catch (err) {
        console.error(err);
    }
}

export default deleteTaskDelete;
