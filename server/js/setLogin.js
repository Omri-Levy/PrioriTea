import * as jwt from 'jsonwebtoken';

const {verify} = jwt;

const setLogin = async (req, res, next) => {
    try {
        const authorization = req.headers['cookie'];
        const token = authorization.split('mid=')[1];

        await verify(token, process.env.SECRET_ACCESS_TOKEN);

        res.send(true);
    } catch (err) {
        console.error(err);
        res.send(false);
    }
    next();
};

export default setLogin;
