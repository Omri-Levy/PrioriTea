import {cloneDeep} from 'lodash';

const filterBySearch = (value, tasksOriginal, setTasksCopy) => {

    const valueIncluded = (task) => {
        return (
            task.priority.toLowerCase().includes(value) ||
            task.task.toLowerCase().includes(value) ||
            task.status.toLowerCase().includes(value)
        );
    }

    const tasksClone = cloneDeep(tasksOriginal);
    const filteredTasks = tasksClone.filter(task => valueIncluded(task));
    setTasksCopy(filteredTasks);
}

const filterByBtn = (Event, tasksOriginal, setTasksCopy) => {
    const key = (
        Event.target
            .closest('th')
            .getElementsByTagName('span')[0]
            .innerHTML.toLowerCase()
    );
    const value = Event.target.innerText;
    const tasksClone = cloneDeep(tasksOriginal);
    const filteredTasks = tasksClone.filter(task => task[key] === value);
    setTasksCopy(filteredTasks);
}

export {
    filterBySearch,
    filterByBtn
};
