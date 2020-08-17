import React from 'react';
import {PaginationProvider} from '../../context/PaginationContext.jsx';
import TasksContainer from '../tasks/TasksContainer.jsx';

const Home = () => {

    return (
        <div className='body-container'>
            <PaginationProvider>
                <TasksContainer/>
            </PaginationProvider>
        </div>
    );
}

export default Home;
