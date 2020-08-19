import React, {useReducer, createContext} from 'react';
import tasksReducer from './reducers/tasksReducer.js';

const TasksContext = createContext(undefined);

const TasksProvider = props => {
    const [tasksObj, dispatch] = useReducer(tasksReducer, {
        tasks: [],
        tasksCopy: [],
        filter: localStorage.getItem('filter')
    });
    const setTasks = data => dispatch({
        type: 'GET_TASKS',
        payload: data
    });

    const setTasksCopy = data => dispatch({
        type: 'SET_TASKS_COPY',
        payload: data
    });

    return (
        <TasksContext.Provider value={{...tasksObj, setTasks, setTasksCopy}}>
            {props.children}
        </TasksContext.Provider>
    );
}

export {TasksProvider, TasksContext};
