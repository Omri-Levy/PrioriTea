const displayTaskOptionsTooltip = () => {
    const selector = '.task-options-tooltip-container'
    const parent = document.querySelector(selector);
    const target = parent.firstChild;
    target.classList.remove('hidden');
}

const hideTaskOptionsTooltip = () => {
    const selector = '.task-options-tooltip-container'
    const parent = document.querySelector(selector);
    const target = parent.firstChild;
    target.classList.add('hidden');
}

const displayTaskFilterTooltip = (Event) => {
    const parent = Event.target;
    const target = parent.firstChild.firstChild;
    target.classList.remove('hidden');
}
const hideTaskFilterTooltip = (Event) => {
    const parent = Event.target;
    const target = parent.firstChild.firstChild;
    target.classList.add('hidden');
}

const toggleCreateTaskModal = () => {
    const selector = '.create-task-modal-container';
    const createTaskModal = document.querySelector(selector);

    createTaskModal.classList.toggle('hidden');
}

const toggleEditTaskModal = () => {
    const selector = '.edit-task-modal-container';
    const target = document.querySelector(selector);
    target.classList.toggle('hidden');
}

const editTask = (id, setEditTaskId) => {
    toggleEditTaskModal();
    setEditTaskId(id);
}

export {
    displayTaskOptionsTooltip,
    hideTaskOptionsTooltip,
    displayTaskFilterTooltip,
    hideTaskFilterTooltip,
    toggleCreateTaskModal,
    toggleEditTaskModal,
    editTask
}
