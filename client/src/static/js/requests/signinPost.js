import axios from 'axios';

const signinPost = async (data, history, setSignedInPost, signin, signout) => {

    const url = `${process.env.REACT_APP_API}/user/signin`;

    try {
        await axios.post(url, {
            email: data.email,
            password: data.password
        }, {
            withCredentials: true
        });
        const res = await setSignedInPost();
        res && res.data ? signin() : signout();
        history.push('/');
    } catch (err) {
        console.log(err);
    }
};

export default signinPost;
