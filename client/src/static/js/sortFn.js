const sortFn = (tasks, setTasks, setTasksCopy) => {
    const sortedTasks = tasks.sort((a, b) => {
            const {sortBy, orderBy} = JSON.parse(localStorage.getItem(
                'sort'));
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
        }
    );
    setTasks(sortedTasks);
    setTasksCopy(sortedTasks);
}

export default sortFn;
