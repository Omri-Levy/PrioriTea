import axios from 'axios';

const signinPost = async (data) => {
    const url = 'http://localhost:4000/api/user/signin';

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
