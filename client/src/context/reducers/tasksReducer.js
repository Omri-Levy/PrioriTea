const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return [...state, {
                _id: action.payload._id,
                priority: action.payload.priority,
                task: action.payload.task,
                status: action.payload.status
            }];
        case 'RESET_TASKS':
            return [];
        default:
            return [];
    }
}

export default tasksReducer;
