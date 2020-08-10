import axios from 'axios';
import {hideCreateListModal} from '../handlers.js';

const createListPost = async (data, getLists) => {
    const url = 'http://localhost:3000/api/list/create_list';
    try {
        const res = (
            await axios
                .post(url, {
                    title: data.title,
                    owner: data.owner,
                })
        );
        console.log(res);
        hideCreateListModal();
        getLists();
    } catch (err) {
        console.log(err);
    }
}

export default createListPost;
