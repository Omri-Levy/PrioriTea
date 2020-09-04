const setSignedInPost = async (signin, signout, history = null) => {
    const url = `${process.env.REACT_APP_API}/auth`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    try {
        const data = await (await fetch(url, options)).json();
        if (data && data.isSignedIn) {
            signin();
            history && history.push('/');
        } else {
            signout();
            history && history.push('/signin');
        }
    } catch (err) {
        console.log(err);
    }
};

export default setSignedInPost;
