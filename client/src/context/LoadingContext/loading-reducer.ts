export const isLoadingReducer = (state: any, action: { type: string }) => {
  switch (action.type) {
    case "START_LOADING":
      return true;
    case "STOP_LOADING":
      return false;
    default:
      return false;
  }
};
