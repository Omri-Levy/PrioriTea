import axios from 'axios';

export const deleteTaskDelete = async (id, getTasks) => {
    const url = 'http://localhost:4000/api/task/delete_task';
    try {
        const res = (
            await axios
                .delete(url, {
                    data:
                        {
                            _id: id
                        }
                })
        );
        console.log(res);
        getTasks();
    } catch (err) {
        console.log(err);
    }
}
