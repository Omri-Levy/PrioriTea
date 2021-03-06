import "core-js/stable";
import "regenerator-runtime/runtime";
import {verify} from 'jsonwebtoken';

const getCurrentUser = async (req, res, next) => {
    const authorization = req.headers['cookie'];

    if (!authorization) {
        console.error('unauthorized');
        return res.status(400).json({success: false});
    }

    const token = authorization.split('mid=')[1];

    if (!token) {
        console.error('unauthorized');
        return res.status(400).json({success: false});
    }

    const verified = verify(token, process.env.SECRET_ACCESS_TOKEN);

    if (!verified) {
        console.error('unauthorized');
        return res.status(400).json({success: false});
    }

    res.json({email: verified.email, fullName: verified.fullName});

    next();
};

export default getCurrentUser;
