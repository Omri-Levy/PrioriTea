const displayTaskOptionsTooltip = () => {
    const selector = '.task-options-tooltip-btn'
    const parent = document.querySelector(selector);
    const target = parent.firstChild;
    target && target.classList.remove('hidden');
}

const hideTaskOptionsTooltip = () => {
    const selector = '.task-options-tooltip-btn'
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
    const targetTitle = target.parentElement.innerText.toLowerCase();
    target && target.classList.toggle('sorted-asc');
    target && target.classList.toggle('sorted-desc');
    if (target.className === 'sorted-desc') {
        localStorage.setItem('sort', JSON.stringify({
            sortBy: targetTitle,
            orderBy: 'desc'
        }))
    } else {
        localStorage.setItem('sort', JSON.stringify({
            sortBy: targetTitle,
            orderBy: 'asc'
        }))
    }
}


export {
    displayTaskOptionsTooltip,
    hideTaskOptionsTooltip,
    displayTaskFilterTooltip,
    hideTaskFilterTooltip,
    toggleSort
}
