import axios from 'axios';

export const deleteListDelete = async (id, getLists) => {
    const url = 'http://localhost:3000/api/list/delete_list';
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
        getLists();
    } catch (err) {
        console.log(err);
    }
}
