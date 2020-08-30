import axios from 'axios';

const signinPost = async (data) => {

    const url = `${process.env.REACT_APP_API}/user/signin`;

    try {
        await axios.post(url, {
            email: data.email,
            password: data.password
        }, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'https://prioritea.net'
            }
        });

    } catch (err) {
        console.log(err);
    }
};

export default signinPost;
