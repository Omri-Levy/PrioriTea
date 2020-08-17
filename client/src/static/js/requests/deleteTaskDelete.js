import axios from 'axios';

const deleteTaskDelete = async (id) => {
    try {
        const url = 'http://localhost:4000/api/task/delete_task';
        const res = await axios.delete(url, {data: {_id: id}});
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}

export default deleteTaskDelete;
