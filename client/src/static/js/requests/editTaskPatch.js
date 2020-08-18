import axios from 'axios';
import {cloneDeep} from 'lodash';
import {toggleEditTaskModal} from '../handlers.js';

const editTaskPatch = async (data, editTaskId, tasks, setTasks,
                             setTasksCopy) => {
    const url = 'http://localhost:4000/api/task/edit_task';
    try {
        const res = (
            await axios
                .patch(url, {
                    _id: editTaskId,
                    priority: data.priority,
                    task: data.task,
                    status: data.status
                })
        );
        console.log(res);
        toggleEditTaskModal();
        let tasksCopy = cloneDeep(tasks);
        for (let i in tasksCopy) {
            if (tasksCopy[i]._id === editTaskId) {
                tasksCopy[i].priority = data.priority ? data.priority :
                    tasksCopy[i].priority;
                tasksCopy[i].task = data.task ? data.task :
                    tasksCopy[i].task;
                tasksCopy[i].status = data.status ? data.status :
                    tasksCopy[i].status;
                break;
            }
        }
        setTasks(tasksCopy);
        setTasksCopy(tasksCopy);
    } catch (err) {
        console.error(err);
    }
}

export default editTaskPatch;
