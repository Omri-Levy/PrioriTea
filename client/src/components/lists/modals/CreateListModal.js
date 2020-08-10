import React from 'react';
import {CreateListForm} from '../../forms/CreateListForm.js';

const CreateListModal = ({getLists}) => {
    return (
        <div className='create-list-modal-container hidden'>
            <div className='create-list-modal-content'>
                <CreateListForm getLists={getLists}/>
            </div>
        </div>
    );
}

export default CreateListModal;
