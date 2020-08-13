import axios from 'axios';
import getTasksGet from './getTasksGet';

export const deleteTaskDelete = async (id, setTasks, setTasksCopy) => {
    const url = 'http://localhost:4000/api/task/delete_task';
    try {
        const res = (
            await axios
                .delete(url, {
                    data:
                        {
                            _id: id
                        }
                })
        );
        console.log(res);
        await getTasksGet(setTasks, setTasksCopy);
    } catch (err) {
        console.log(err);
    }
}
