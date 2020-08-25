import axios from 'axios';

const signoutPost = async () => {
    const url = 'http://localhost:4000/api/user/signout';
    try {
        const res = await axios.post(url, {}, {
            withCredentials: true
        });
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

export default signoutPost;
