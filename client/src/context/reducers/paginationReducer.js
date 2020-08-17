const paginationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload.pageNum
            };
        case 'SET_TASKS_PER_PAGE':
            return {
                ...state,
                tasksPerPage: action.payload.num
            };
        default:
            return state;
    }
}

export default paginationReducer;
