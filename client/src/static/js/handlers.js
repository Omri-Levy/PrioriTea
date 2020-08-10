export const displayTasksTooltip = () => {
    const tasksTooltip =
        document.querySelector('.tasks-tooltip');
    tasksTooltip.classList.remove('hidden');
}
export const hideTasksTooltip = () => {
    const tasksTooltip =
        document.querySelector('.tasks-tooltip');
    tasksTooltip.classList.add('hidden');
}

export const displayCreateTaskModal = () => {
    const createTaskModal =
        document.querySelector('.create-task-modal-container');
    createTaskModal.classList.remove('hidden');
}
export const hideCreateTaskModal = () => {
    const createTaskModal =
        document.querySelector('.create-task-modal-container');
    createTaskModal.classList.add('hidden');
}

export const displayEditTaskModal = () => {
    const createTaskModal =
        document.querySelector('.edit-task-modal-container');
    createTaskModal.classList.remove('hidden');
}
export const hideEditTaskModal = () => {
    const createTaskModal =
        document.querySelector('.edit-task-modal-container');
    createTaskModal.classList.add('hidden');
}

export const editTask = (id, setEditTaskId) => {
    displayEditTaskModal();
    setEditTaskId(id);
}
