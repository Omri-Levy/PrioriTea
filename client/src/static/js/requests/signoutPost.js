import axios from 'axios';

const signoutPost = async () => {
    const url = 'http://localhost:4000/api/user/signout';

    try {
        await axios.post(url, {}, {withCredentials: true});
    } catch (err) {
        console.log(err);
    }
};

export default signoutPost;
