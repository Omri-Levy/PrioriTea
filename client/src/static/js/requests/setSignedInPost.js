import axios from 'axios';


const setSignedInPost = async () => {

    const url = `${process.env.REACT_APP_API}/auth`;

    try {
        return await axios.post(url, {}, {withCredentials: true});
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default setSignedInPost;
