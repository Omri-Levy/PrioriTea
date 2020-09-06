const getCurrentUserPost = async (setCurrentEmail, setCurrentFullName) => {
    const url = `${process.env.REACT_APP_API}/get_current_user`;
    const options = {
        method: 'POST',
        credentials: 'include'
    };

    try {
        const data = await (await fetch(url, options)).json();
        if (data) {
            await setCurrentEmail(data.email);
            await setCurrentFullName(data.fullName);
        }

    } catch (err) {
        console.error(err);
    }
};

export default getCurrentUserPost;
