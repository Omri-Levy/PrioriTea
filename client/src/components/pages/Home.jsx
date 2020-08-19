import React from 'react';
import {PaginationProvider} from '../../context/PaginationContext.jsx';
import {TasksProvider} from '../../context/TasksContext.jsx';
import TasksContainer from '../tasks/TasksContainer.jsx';

const Home = () => {

    return (
        <main className='body-container'>
            <TasksProvider>
                <PaginationProvider>
                    <TasksContainer/>
                </PaginationProvider>
            </TasksProvider>
        </main>
    );
}

export default Home;
