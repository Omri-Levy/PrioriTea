export const tasksReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: [...action.payload],
      };
    case "SET_EDIT_TASK_ID":
      return {
        ...state,
        editTaskId: action.payload,
      };
    default:
      return state;
  }
};
