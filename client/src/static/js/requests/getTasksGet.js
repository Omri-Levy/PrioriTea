import {persistFilter} from '../filter.js';
import sortFn from '../sortFn.js';

const getTasksGet = async (setTasks, setTasksCopy) => {
    const url = `${process.env.REACT_APP_API_TASK}/get_tasks`;
    const options = {
        method: 'GET',
        credentials: 'include'
    };

    try {
        const data = await (await fetch(url, options)).json();

        if (data.length > 0) {
            const isGet = true;

            await setTasks(data);
            await setTasksCopy(data);

            sortFn(data, setTasks, setTasksCopy, isGet);
            persistFilter(data, setTasksCopy);
        }
    } catch (err) {
        console.error(err);
    }
};

export default getTasksGet;
