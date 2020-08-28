const paginationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'SET_TASKS_PER_PAGE':
            return {
                ...state,
                tasksPerPage: action.payload
            }
        case 'SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.payload
            }

    }
};

export default paginationReducer;
