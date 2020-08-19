import axios from 'axios';
import {persistFilter} from '../filter.js';

const getTasksGet = async (setTasks, setTasksCopy) => {
    const res = await axios.get(
        'http://localhost:4000/api/task/get_tasks');
    if (res.data.length > 0) {
        const tempTasks = res.data;
        const sortedTasks = tempTasks.sort((a, b) => {
                if (isNaN(a.priority - b.priority)) {
                    return a.priority > b.priority ? 1 : -1;
                } else {
                    return a.priority - b.priority;
                }
            }
        );
        await setTasks(sortedTasks);
        await setTasksCopy(sortedTasks);
        persistFilter(sortedTasks, setTasksCopy);
    }
}

export default getTasksGet;
