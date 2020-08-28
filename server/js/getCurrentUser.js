import * as jwt from 'jsonwebtoken';

const {verify} = jwt;

const getCurrentUser = async (req, res, next) => {
    try {
        const authorization = req.headers['cookie'];
        const token = authorization.split('mid=')[1];

        const verified = verify(token, process.env.SECRET_ACCESS_TOKEN);

        res.send({email: verified.email, fullName: verified.fullName});
    } catch (err) {
        console.error(err);
        res.send({success: false});
    }
    next();
};

export default getCurrentUser;
