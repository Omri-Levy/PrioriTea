import axios from 'axios';

const signoutPost = async () => {

    const url = `${process.env.REACT_APP_API_USER}/signout`;

    try {
        await axios.post(url, {}, {withCredentials: true});
    } catch (err) {
        console.log(err);
    }
};

export default signoutPost;
