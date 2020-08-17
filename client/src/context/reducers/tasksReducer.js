const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return [...action.payload];
        case 'RESET_TASKS':
            return [];
        default:
            return [];
    }
}

export default tasksReducer;
