import {cloneDeep} from 'lodash';

const filterBySearch = (value, tasks, setTasksCopy) => {
    localStorage.getItem('filter') && localStorage.removeItem(
        'filter');

    const valueIncluded = (task) => {
        return (
            task.priority.toLowerCase().includes(value) ||
            task.task.toLowerCase().includes(value) ||
            task.status.toLowerCase().includes(value)
        );
    }

    const tasksClone = cloneDeep(tasks);
    const filteredTasks = tasksClone.filter(task => valueIncluded(task));
    setTasksCopy(filteredTasks);
}

const filterByBtn = (Event, tasks, setTasksCopy) => {
    const key = (Event.target.closest('th').getElementsByTagName(
        'span')[0].innerText.toLowerCase());
    const value = Event.target.innerText;
    setFilter(key, value);
    const tasksClone = cloneDeep(tasks);
    const filteredTasks = tasksClone.filter(task => task[key] === value);
    setTasksCopy(filteredTasks);
}

const setFilter = (key, value) => {
    const filterObj = {'key': key, 'value': value};
    localStorage.setItem('filter', JSON.stringify(filterObj));
}

const persistFilter = (tasks, setTasksCopy) => {
    const filterObj = JSON.parse(localStorage.getItem('filter'));
    if (filterObj) {
        const {key, value} = filterObj;
        const tasksClone = cloneDeep(tasks);
        const filteredTasks = tasksClone.filter(task => task[key] === value);
        setTasksCopy(filteredTasks);
    }
}

export {
    filterBySearch,
    filterByBtn,
    persistFilter
};
