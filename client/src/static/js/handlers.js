export const displayListsTooltip = () => {
    const listsTooltip =
        document.querySelector('.lists-tooltip');
    listsTooltip.classList.remove('hidden');
}
export const hideListsTooltip = () => {
    const listsTooltip =
        document.querySelector('.lists-tooltip');
    listsTooltip.classList.add('hidden');
}

export const displayCreateListModal = () => {
    const createListModal =
        document.querySelector('.create-list-modal-container');
    createListModal.classList.remove('hidden');
}
export const hideCreateListModal = () => {
    const createListModal =
        document.querySelector('.create-list-modal-container');
    createListModal.classList.add('hidden');
}

export const displayEditListModal = () => {
    const createListModal =
        document.querySelector('.edit-list-modal-container');
    createListModal.classList.remove('hidden');
}
export const hideEditListModal = () => {
    const createListModal =
        document.querySelector('.edit-list-modal-container');
    createListModal.classList.add('hidden');
}

export const editList = (id, setEditListId) => {
    displayEditListModal();
    setEditListId(id);
}