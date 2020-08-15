const displayTaskOptionsTooltip = () => {
    const taskOptionsTooltip =
        document.querySelector('.task-options-tooltip');
    taskOptionsTooltip.classList.remove('hidden');
}
const hideTaskOptionsTooltip = () => {
    const taskOptionsTooltip =
        document.querySelector('.task-options-tooltip');
    taskOptionsTooltip.classList.add('hidden');
}

const displayTaskFilterTooltip = () => {
    const taskFilterTooltip =
        document.querySelector('.task-filter-tooltip');
    taskFilterTooltip.classList.remove('hidden');
}
const hideTaskFilterTooltip = () => {
    const taskFilterTooltip =
        document.querySelector('.task-filter-tooltip');
    taskFilterTooltip.classList.add('hidden');
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
    displayTaskOptionsTooltip,
    hideTaskOptionsTooltip,
    displayTaskFilterTooltip,
    hideTaskFilterTooltip,
    displayCreateTaskModal,
    hideCreateTaskModal,
    hideEditTaskModal,
    editTask
}
