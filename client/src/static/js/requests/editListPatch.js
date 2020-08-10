import axios from 'axios';
import {hideEditListModal} from '../handlers.js';

const editListPatch = async (data, getLists, editListId) => {
    const url = 'http://localhost:3000/api/list/edit_list';
    try {
        const res = (
            await axios
                .patch(url, {
                    _id: editListId,
                    title: data.title,
                    owner: data.owner
                })
        );
        console.log(res);
        hideEditListModal();
        getLists();
    } catch (err) {
        console.log(err);
    }
}

export default editListPatch;
