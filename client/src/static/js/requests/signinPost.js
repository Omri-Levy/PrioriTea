import setIsSignedInPost from './setSignedInPost.js';

const signinPost = async (data, history, signin, signout, setError) => {
    const url = `${process.env.REACT_APP_API_USER}/signin`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
        credentials: 'include'
    };

    try {
        const res = await (await fetch(url, options)).json();
        if (res.message ===
            'Email or password are wrong - please try again.') {
            setError(res.message);
        }
        await setIsSignedInPost(signin, signout, history);
    } catch (err) {
        console.log(err);
    }
};

export default signinPost;

