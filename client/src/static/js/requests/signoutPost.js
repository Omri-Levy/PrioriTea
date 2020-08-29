import axios from 'axios';
import {API_HOST_DEV, API_HOST_PROD, API_PORT_DEV, API_PORT_PROD}
    from '../constants.js';

const signoutPost = async () => {
    let host;
    let port;

    if (process.env.NODE_ENV === 'production') {
        host = API_HOST_PROD;
        port = API_PORT_PROD;
    } else {
        host = API_HOST_DEV;
        port = API_PORT_DEV;
    }

    const url = `http://${host}:${port}/api/user/signout`;

    try {
        await axios.post(url, {}, {withCredentials: true});
    } catch (err) {
        console.log(err);
    }
};

export default signoutPost;
