import React from 'react';
import {EditListForm} from '../../forms/EditListForm.js';

const EditListModal = ({editListId, getLists}) => {
    return (
        <div className='edit-list-modal-container hidden'>
            <div className='edit-list-modal-content'>
                <EditListForm editListId={editListId} getLists={getLists}/>
            </div>
        </div>
    );
}

export default EditListModal;
