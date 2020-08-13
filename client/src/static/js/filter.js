const filter = (value, setTasksCopy, tasks) => {
    const valueIncluded = (task) => {
        return (
            task.priority.includes(value) ||
            task.task.includes(value) ||
            task.status.includes(value)
        );
    }

    const filteredTasks = tasks.filter(task => valueIncluded(task));

    setTasksCopy(filteredTasks);
}

export default filter;
