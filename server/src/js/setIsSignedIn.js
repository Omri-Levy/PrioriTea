import {verify} from 'jsonwebtoken';
import User from '../models/User.js';
import sendAccessToken from './sendAccessToken.js';

const setIsSignedIn = async (req, res) => {
    const authorization = req.headers['cookie'];

    if (!authorization) {
        console.error('unauthorized');
        return res.status(401).json({isSignedIn: false});
    }

    const token = authorization.split('mid=')[1];

    if (!token) {
        console.error('unauthorized');
        return res.status(401).json({isSignedIn: false});
    }

    const {id} = await verify(token, process.env.SECRET_ACCESS_TOKEN);
    const user = await User.findById(id);

    if (user) {
        return res.status(200).json({isSignedIn: true});
    } else {
        sendAccessToken(res, '');
        return res.status(401).json({isSignedIn: false});
    }

};

export default setIsSignedIn;
