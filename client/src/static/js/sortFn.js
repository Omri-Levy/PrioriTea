const sortFn = (tasks, setTasks, setTasksCopy, isGet) => {
    const sortedTasks = tasks.sort((a, b) => {
        let sortObj = JSON.parse(localStorage.getItem('sort'));
        if (!sortObj) sortObj = {
            sortBy: 'priority',
            orderBy: 'asc'
        }
        const {sortBy, orderBy} = sortObj;
        if (isNaN(a[sortBy] - b[sortBy])) {
            if (orderBy === 'desc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] > b[sortBy] ? -1 : 1;
            }
        } else {
            if (orderBy === 'desc') {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        }
    });

    if (isGet) {
        setTasks(sortedTasks);
        setTasksCopy(sortedTasks);
    } else {
        setTasksCopy(sortedTasks);
    }
};

export default sortFn;
