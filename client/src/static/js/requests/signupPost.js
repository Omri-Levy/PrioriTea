const signupPost = async (data, history, setDisplayEmailExistsMsg) => {
    const url = `${process.env.REACT_APP_API_USER}/signup`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email, fullName: data.fullName,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
        })
    };

    try {
        const res = await (await fetch(url, options)).json();
        if (res.message === 'Email already exists.') {
            setDisplayEmailExistsMsg(true);
        } else {
            setDisplayEmailExistsMsg(false);
            history.push('/signin');
        }
    } catch (err) {
        console.error(err);
    }
}

export default signupPost;
