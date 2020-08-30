import axios from 'axios';

const getCurrentUserPost = async (setCurrentEmail, setCurrentFullName) => {
    let url;

    if (process.env.NODE_ENV === 'production') {
        url = `${process.env.REACT_APP_API_PROD}/get_current_user`;
    } else {
        url = `${process.env.REACT_APP_API_DEV}/get_current_user`;
    }

    try {
        const res = await axios.post(url, {}, {
            withCredentials: true
        });

        await setCurrentEmail(res.data.email);
        await setCurrentFullName(res.data.fullName);

    } catch (err) {
        console.error(err);
    }
};

export default getCurrentUserPost;
