const sendAccessToken = (res, token) => {
    res.cookie('mid', token, {
        httpOnly: true,
        path: '/',
        domain: 'localhost',
        sameSite: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 9)
    })
}

export default sendAccessToken;
