const sendAccessToken = (res, token) => {
    res.cookie('mid', token, {
        maxAge: 1000 * 60 * 60 * 9,
        httpOnly: true,
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? '.prioritea.net' :
            undefined,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 9)
    });
};

export default sendAccessToken;
