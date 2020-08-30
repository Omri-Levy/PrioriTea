import axios from 'axios';

const getCurrentUserPost = async (setCurrentEmail, setCurrentFullName) => {

    const url = `${process.env.REACT_APP_API}/get_current_user`;

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
