import axios from 'axios';

const editTaskPatch = async (data, editTaskId, tasks, setTasks, setTasksCopy,
                             callback) => {
    let url;

    if (process.env.NODE_ENV === 'production') {
        url = `${process.env.REACT_APP_API_PROD}/task/edit_task`;
    } else {
        url = `${process.env.REACT_APP_API_DEV}/task/edit_task`;
    }

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
