const displayTasksTooltip = () => {
    const tasksTooltip =
        document.querySelector('.tasks-tooltip');
    tasksTooltip.classList.remove('hidden');
}
const hideTasksTooltip = () => {
    const tasksTooltip =
        document.querySelector('.tasks-tooltip');
    tasksTooltip.classList.add('hidden');
}

const displayCreateTaskModal = () => {
    const createTaskModal =
        document.querySelector('.create-task-modal-container');
    createTaskModal.classList.remove('hidden');
}
const hideCreateTaskModal = () => {
    const createTaskModal =
        document.querySelector('.create-task-modal-container');
    createTaskModal.classList.add('hidden');
}

const displayEditTaskModal = () => {
    const createTaskModal =
        document.querySelector('.edit-task-modal-container');
    createTaskModal.classList.remove('hidden');
}
const hideEditTaskModal = () => {
    const createTaskModal =
        document.querySelector('.edit-task-modal-container');
    createTaskModal.classList.add('hidden');
}

const editTask = (id, setEditTaskId) => {
    displayEditTaskModal();
    setEditTaskId(id);
}

export {
    displayTasksTooltip,
    hideTasksTooltip,
    displayCreateTaskModal,
    hideCreateTaskModal,
    hideEditTaskModal,
    editTask
}
