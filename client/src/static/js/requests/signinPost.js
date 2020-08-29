import axios from 'axios';
import {
    API_HOST_DEV, API_HOST_PROD, API_PORT_DEV, API_PORT_PROD,
    ENCRYPTION_DEV, ENCRYPTION_PROD
}
    from '../constants.js';

const signinPost = async (data) => {
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

    const url = `${encryption}://${host}:${port}/api/user/signin`;

    try {
        await axios.post(url, {
            email: data.email,
            password: data.password
        }, {
            withCredentials: true
        });

    } catch (err) {
        console.log(err);
    }
};

export default signinPost;
