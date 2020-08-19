const displayTaskOptionsTooltip = () => {
    const selector = '.task-options-tooltip-container'
    const parent = document.querySelector(selector);
    const target = parent.firstChild;
    target && target.classList.remove('hidden');
}

const hideTaskOptionsTooltip = () => {
    const selector = '.task-options-tooltip-container'
    const parent = document.querySelector(selector);
    const target = parent.firstChild;
    target && target.classList.add('hidden');
}

const displayTaskFilterTooltip = (Event) => {
    let target = Event.target.closest('#hidden-filter-modal');
    if (!target) {
        target = Event.target.firstChild.firstChild;
    }
    target && target.classList.remove('hidden');
}
const hideTaskFilterTooltip = (Event) => {
    let target = Event.target.closest('#hidden-filter-modal');
    if (!target) {
        target = Event.target.firstChild.firstChild;
    }
    target && target.classList.add('hidden');
}

const toggleSort = (Event) => {
    const target = Event.target;
    target && target.classList.toggle('sorted-asc');
    target && target.classList.toggle('sorted-desc');
}


const toggleCreateTaskModal = () => {
    const selector = '.create-task-modal-container';
    const target = document.querySelector(selector);
    target && target.classList.toggle('hidden');
}

const toggleEditTaskModal = () => {
    const selector = '.edit-task-modal-container';
    const target = document.querySelector(selector);
    target && target.classList.toggle('hidden');
}

export {
    displayTaskOptionsTooltip,
    hideTaskOptionsTooltip,
    displayTaskFilterTooltip,
    hideTaskFilterTooltip,
    toggleCreateTaskModal,
    toggleEditTaskModal,
    toggleSort
}
