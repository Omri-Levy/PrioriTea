import React from 'react';
import TaskFilterModal from '../modals/TaskFilterModal.jsx';
import TaskOptionsModal from '../modals/TaskOptionsModal.jsx';

const InvalidFilter = () => {
    const titleMessage = 'Sorting Is Unavailable With Invalid Filter';

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>
                        <TaskFilterModal target={'priority'}/>
                        <span>
                                Priority
                                    <i title={titleMessage}
                                       className='sorted-desc draft'/>
                                    </span>
                    </th>
                    <th>
                        <TaskFilterModal target={'task'}/>
                        <span>
                                Task
                                    <i title={titleMessage}
                                       className='sorted-desc draft'/>
                                    </span>
                    </th>
                    <th>
                        <TaskFilterModal target={'status'}/>
                        <TaskOptionsModal invalidFilter={true} taskId={
                            'invalid-filter'}/>
                        <span>
                                Status
                                    <i title={titleMessage}
                                       className='sorted-desc draft'/>
                                    </span>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className='priority'>Invalid Filter</td>
                    <td className='task'>Invalid Filter</td>
                    <td className='status'>Invalid Filter</td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default InvalidFilter;
