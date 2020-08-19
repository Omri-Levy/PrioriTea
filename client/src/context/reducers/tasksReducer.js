const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return {
                ...state,
                tasks: [...action.payload]
            };
        case 'SET_TASKS_COPY':
            return {
                ...state,
                tasksCopy: [...action.payload]
            };
        default:
            return [];
    }
}

export default tasksReducer;
