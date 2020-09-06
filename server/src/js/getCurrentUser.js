import "core-js/stable";
import "regenerator-runtime/runtime";
import {verify} from 'jsonwebtoken';

const getCurrentUser = async (req, res, next) => {
    try {
        const authorization = req.headers['cookie'];
        const token = authorization.split('mid=')[1];
        const verified = verify(token, process.env.SECRET_ACCESS_TOKEN);

        res.json({email: verified.email, fullName: verified.fullName});
    } catch (err) {
        if (req.headers['cookie'] === undefined) {
            console.error('unauthorized');
        } else {
            console.error(err);
        }
        res.json({success: false});
    }
    next();
};

export default getCurrentUser;
