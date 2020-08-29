import axios from 'axios';
import {API_HOST_DEV, API_HOST_PROD, API_PORT_DEV, API_PORT_PROD}
    from '../constants.js';

const signupPost = async (data, history, setDisplayEmailExistsMsg) => {
    let host;
    let port;

    if (process.env.NODE_ENV === 'production') {
        host = API_HOST_PROD;
        port = API_PORT_PROD;
    } else {
        host = API_HOST_DEV;
        port = API_PORT_DEV;
    }

    const url = `http://${host}:${port}/api/user/signup`;

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
