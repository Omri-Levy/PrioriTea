import axios from 'axios';

const signupPost = async (data, history, setDisplayEmailExistsMsg) => {

    const url = `${process.env.REACT_APP_API}/user/signup`;


    try {
        await axios.post(url, {
            email: data.email, fullName: data.fullName,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
        });
        setDisplayEmailExistsMsg(false);
        history.push('/signin')
    } catch (err) {
        console.error(err);
        if (err.response.data.message === 'Email already exists.') {
            setDisplayEmailExistsMsg(true);
        }
    }
}

export default signupPost;
