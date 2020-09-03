import {verify} from 'jsonwebtoken';
import User from '../models/User.js';

const setIsSignedIn = async (req, res, next) => {
    try {
        const authorization = req.headers['cookie'];
        const token = authorization.split('mid=')[1];
        const {id} = await verify(token, process.env.SECRET_ACCESS_TOKEN);
        const user = await User.findById(id);

        if (user) {
            res.json({isSignedIn: true})
        } else {
            res.clearCookie('mid');
            res.json({isSignedIn: false});
        }
    } catch (err) {
        if (req.headers['cookie'] === undefined) {
            console.error('unauthorized');
        } else {
            console.error(err);
        }

        res.json({isSignedIn: false});
    }
    next();
};

export default setIsSignedIn;
