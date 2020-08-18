import axios from 'axios';
import {toggleCreateTaskModal} from '../handlers';

const getTasksGet = async (setTasks, setTasksCopy) => {
    const res = await axios.get(
        'http://localhost:4000/api/task/get_tasks');
    res.data.length === 0 && toggleCreateTaskModal();
    await setTasks(res.data);
    await setTasksCopy(res.data);
}

export default getTasksGet;
