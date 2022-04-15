export const loadingReducer = (state, action) => {
	switch (action.type) {
		case 'START_LOADING':
			return true;
		case 'STOP_LOADING':
			return false;
		default:
			return false;
	}
};
