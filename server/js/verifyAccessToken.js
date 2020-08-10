import {verify} from 'jsonwebtoken';

const verifyAccessToken = (req, res, next) => {
    const accessToken = req.header('auth-access-token');
    if (!accessToken) return res.status(401).send('Access Denied');
    try {
        req.user = verify(accessToken, process.env.SECRET_TOKEN);
        next();
    } catch (err) {
        res.status(400).send('Invalid Token.');
    }
}

export default verifyAccessToken;
