import React, {useState, createContext} from 'react';

const AppContext = createContext();

const AppProvider = (props) => {
    const [tasks, setTasks] = useState([]);
    const [tasksCopy, setTasksCopy] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(1);

    return (
        <AppContext.Provider
            value={
                [
                    tasks, setTasks,
                    tasksCopy, setTasksCopy,
                    loading, setLoading,
                    currentPage, setCurrentPage,
                    tasksPerPage
                ]
            }
        >
            {props.children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppProvider
}
