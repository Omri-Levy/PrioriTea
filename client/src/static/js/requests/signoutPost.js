import axios from 'axios';

const signoutPost = async () => {
    let url;

    if (process.env.NODE_ENV === 'production') {
        url = `${process.env.REACT_APP_API_PROD}/user/signout`;
    } else {
        url = `${process.env.REACT_APP_API_DEV}/user/signout`;
    }

    try {
        await axios.post(url, {}, {withCredentials: true});
    } catch (err) {
        console.log(err);
    }
};

export default signoutPost;
