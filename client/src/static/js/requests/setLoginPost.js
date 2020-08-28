import axios from 'axios';

const setLoginPost = async () => {
    const url = 'http://localhost:4000/api/auth';

    try {
        return await axios.post(url, {}, {withCredentials: true});
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default setLoginPost;
