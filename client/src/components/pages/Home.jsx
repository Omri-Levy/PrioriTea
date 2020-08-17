import React from 'react';
import {PaginationProvider} from '../../context/PaginationContext.jsx';
import {TasksProvider} from '../../context/TasksContext.jsx';
import TasksContainer from '../tasks/TasksContainer.jsx';

const Home = () => {

    return (
        <div className='body-container'>
            <TasksProvider>
                <PaginationProvider>
                    <TasksContainer/>
                </PaginationProvider>
            </TasksProvider>
        </div>
    );
}

export default Home;
