import axios from 'axios';
import {toggleCreateTaskModal} from '../handlers';

const getTasksGet = async (setTasks, setTasksCopy) => {
    const res = (
        await axios
            .get('http://localhost:4000/api/task/get_tasks')
            .catch((err => console.log(err))
            ));
    setTasks(res.data);
    setTasksCopy(res.data);
    res.data.length === 0 && toggleCreateTaskModal();
}

export default getTasksGet;
