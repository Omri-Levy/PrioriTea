import axios from 'axios';


const setSignedInPost = async () => {
    let url;

    if (process.env.NODE_ENV === 'production') {
        url = `${process.env.REACT_APP_API_PROD}/auth`;
    } else {
        url = `${process.env.REACT_APP_API_DEV}/auth`;
    }

    try {
        return await axios.post(url, {}, {withCredentials: true});
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default setSignedInPost;
