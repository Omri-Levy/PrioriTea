import React, {useState} from 'react';
import {
    displayCreateListModal,
    displayListsTooltip,
    editList,
    hideListsTooltip
} from '../../static/js/handlers.js';
import CreateListModal from './modals/CreateListModal.js';
import Loading from '../loading/Loading.js';
import {deleteListDelete} from '../../static/js/requests/deleteListDelete.js';
import EditListModal from './modals/EditListModal.js';

const Lists = ({lists, loading, getLists}) => {
    if (loading) {
        return <Loading/>
    }

    const [editListId, setEditListId] = useState('');

    return (
        <>
            <CreateListModal
                getLists={getLists}
            />
            <EditListModal
                editListId={editListId}
                getLists={getLists}
            />
            {lists.map(list => (
                    <table key={list._id}>
                        <thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th
                                className='lists-tooltip-th'
                            >
                                <i
                                    onMouseEnter={displayListsTooltip}
                                    onMouseLeave={hideListsTooltip}
                                    className='lists-tooltip-container'
                                >
                                    <div className='lists-tooltip hidden'>
                                        <em
                                            onClick={displayCreateListModal}
                                            className='create-list'
                                        />
                                        <em
                                            onClick={
                                                () => editList(list._id,
                                                    setEditListId)}
                                            className='edit-list'/>
                                        <em
                                            onClick={() =>
                                                deleteListDelete(list._id,
                                                    getLists)
                                            }
                                            className='delete-list'
                                        />
                                    </div>
                                </i>
                                Owner
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{list.title}</td>
                            <td>{list.owner}</td>
                        </tr>
                        </tbody>
                    </table>
                )
            )}
        </>
    );
}

export default Lists;
