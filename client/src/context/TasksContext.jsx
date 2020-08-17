import React, {useReducer, createContext} from 'react';
import tasksReducer from './reducers/tasksReducer.js';

const TasksContext = createContext(undefined);

const TasksProvider = props => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const setTasks = data => dispatch({
        type: 'GET_TASKS',
        payload: data
    });

    return (
        <TasksContext.Provider value={{tasks, setTasks}}>
            {props.children}
        </TasksContext.Provider>
    );
}

export {TasksProvider, TasksContext};
