import {cloneDeep} from 'lodash';

const filterBySearch = (value, tasks, setTasks) => {

    const valueIncluded = (task) => {
        return (
            task.priority.toLowerCase().includes(value) ||
            task.task.toLowerCase().includes(value) ||
            task.status.toLowerCase().includes(value)
        );
    }

    const tasksClone = cloneDeep(tasks);
    const filteredTasks = tasksClone.filter(task => valueIncluded(task));
    setTasks(filteredTasks);
}

const filterByBtn = (Event, tasks, setTasks) => {
    const key = (
        Event.target
            .closest('th')
            .getElementsByTagName('span')[0]
            .innerHTML.toLowerCase()
    );
    const value = Event.target.innerText;
    const tasksClone = cloneDeep(tasks);
    const filteredTasks = tasksClone.filter(task => task[key] === value);
    setTasks(filteredTasks);
}

export {
    filterBySearch,
    filterByBtn
};
