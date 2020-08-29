import axios from 'axios';

const editTaskPatch = async (data, editTaskId, tasks, setTasks, setTasksCopy,
                             callback) => {
    const url = 'http://localhost:4000/api/task/edit_task';

    try {
        await axios.patch(url, {
            _id: editTaskId,
            priority: data.priority,
            task: data.task,
            status: data.status
        }, {
            withCredentials: true
        });

        for (let i in tasks) {
            if (tasks.hasOwnProperty(i) && tasks[i]._id === editTaskId) {
                tasks[i].priority = data.priority ? data.priority : tasks[i]
                    .priority;
                tasks[i].task = data.task ? data.task : tasks[i].task;
                tasks[i].status = data.status ? data.status : tasks[i].status;

                break;
            }
        }

        setTasks(tasks);
        setTasksCopy(tasks);

        callback();

    } catch (err) {
        console.error(err);
    }
};

export default editTaskPatch;
