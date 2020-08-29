import axios from 'axios';
import {
    API_HOST_DEV,
    API_HOST_PROD,
    API_PORT_DEV,
    API_PORT_PROD,
    ENCRYPTION_DEV,
    ENCRYPTION_PROD
}
    from '../constants.js';

const signupPost = async (data, history, setDisplayEmailExistsMsg) => {
    let host;
    let port;
    let encryption;

    if (process.env.NODE_ENV === 'production') {
        host = API_HOST_PROD;
        port = API_PORT_PROD;
        encryption = ENCRYPTION_PROD;
    } else {
        host = API_HOST_DEV;
        port = API_PORT_DEV;
        encryption = ENCRYPTION_DEV;
    }

    const url = `${encryption}://${host}:${port}/api/user/signup`;

    try {
        await axios.post(url, {
            email: data.email, fullName: data.fullName,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
        });
        setDisplayEmailExistsMsg(false);
        history.push('/signin')
    } catch (err) {
        console.error(err);
        if (err.response.data.message === 'Email already exists.') {
            setDisplayEmailExistsMsg(true);
        }
    }
}

export default signupPost;
