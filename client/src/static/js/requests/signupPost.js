import axios from 'axios';

const signupPost = async (data) => {
    const url = 'http://localhost:4000/api/user/signup';
    try {
        const res = (
            await axios
                .post(url, {
                    email: data.email,
                    fullName: data.fullName,
                    password: data.password,
                    passwordConfirmation: data.passwordConfirmation
                })
        );
        console.log(res);
        // dispatchHideEmailExistsMsg();
        window.location.href = '/signin';
    } catch (err) {
        if (err.response.data.message === 'Email already exists.') {
            // dispatchDisplayEmailExistsMsg();
            console.log('email already exists');
        } else {
            console.log('email does not exist');
        }
        // dispatchHideEmailExistsMsg();
    }
}

export default signupPost;
