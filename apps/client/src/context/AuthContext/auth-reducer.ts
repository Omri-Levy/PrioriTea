const authReducer = (state: any, action: {type: string}) => {
    switch (action.type) {
        case 'SIGN_IN':
            return true;
        case 'SIGN_OUT':
            return false;
        default:
            return false;
    }
};

export default authReducer;
