import axios from 'axios';

export const deleteTaskDelete = async (id,
                                       setCurrentPage,
                                       tasksOriginal,
                                       setTasksOriginal) => {
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
        const updatedTasks = tasksOriginal.filter(task => task._id !== id);
        setTasksOriginal(updatedTasks);
        const currentPage = localStorage.getItem('currentPage');
        setCurrentPage(JSON.parse(currentPage));

    } catch (err) {
        console.error(err);
    }
}
