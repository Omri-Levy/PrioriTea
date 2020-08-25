import {sign} from 'jsonwebtoken';

const createAccessToken = (user) => {
    return sign({id: user.id},
        process.env.SECRET_ACCESS_TOKEN,
        {
            expiresIn: '9h'
        });
};
export default createAccessToken;
