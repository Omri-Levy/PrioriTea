import axios from 'axios';

const signinPost = async (data) => {
    let url;

    if (process.env.NODE_ENV === 'production') {
        url = `${process.env.REACT_APP_API_PROD}/user/signin`;
    } else {
        url = `${process.env.REACT_APP_API_DEV}/user/signin`;
    }

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
