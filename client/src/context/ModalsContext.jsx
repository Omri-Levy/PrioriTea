import React, {createContext, useReducer} from 'react';
import modalsReducer from './reducers/modalsReducer.js';

const ModalsContext = createContext(undefined);


const ModalsProvider = props => {
    const [modalsObj, dispatch] = useReducer(modalsReducer, {
        createTaskModalOpen: false,
        editTaskModalOpen: false
    });

    const openCreateTaskModal = () => dispatch({
        type: 'OPEN_CREATE_TASK_MODAL'
    });
    const closeCreateTaskModal = () => dispatch({
        type: 'CLOSE_CREATE_TASK_MODAL'
    });
    const openEditTaskModal = () => dispatch({
        type: 'OPEN_EDIT_TASK_MODAL'
    });
    const closeEditTaskModal = () => dispatch({
        type: 'CLOSE_EDIT_TASK_MODAL'
    });

    return (
        <ModalsContext.Provider value={{
            ...modalsObj, openCreateTaskModal,
            closeCreateTaskModal, openEditTaskModal, closeEditTaskModal
        }}>
            {props.children}
        </ModalsContext.Provider>
    );
};

export {ModalsContext, ModalsProvider};
