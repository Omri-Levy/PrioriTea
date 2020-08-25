import {verify} from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    const authorization = req.headers['cookie'];
    if (!authorization) throw new Error('not authorized');
    try {
        const token = authorization.split('mid=')[1];
        await verify(token, process.env.SECRET_ACCESS_TOKEN);
    } catch (err) {
        console.log(err);
        throw new Error('not authorized');
    }
    next();
};

export default isAuth;
