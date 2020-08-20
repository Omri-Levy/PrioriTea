import axios from 'axios';

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
        for (let i in tasks) {
            if (tasks.hasOwnProperty(i) && tasks[i]._id === editTaskId
            ) {
                tasks[i].priority = data.priority ? data.priority :
                    tasks[i].priority;
                tasks[i].task = data.task ? data.task :
                    tasks[i].task;
                tasks[i].status = data.status ? data.status :
                    tasks[i].status;
                break;
            }
        }
        setTasks(tasks);
        setTasksCopy(tasks);
    } catch (err) {
        console.error(err);
    }
}

export default editTaskPatch;
