const signoutPost = async () => {
    const url = `${process.env.REACT_APP_API_USER}/signout`;
    const options = {
        method: 'POST',
        credentials: 'include'
    };

    try {
        await fetch(url, options);
    } catch (err) {
        console.log(err);
    }
};

export default signoutPost;
