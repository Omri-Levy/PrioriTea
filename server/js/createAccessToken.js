import * as jwt from 'jsonwebtoken';

const {sign} = jwt;

const createAccessToken = (user) => {
    return sign({
            id: user.id, email: user.email, fullName: user.fullName
        },
        process.env.SECRET_ACCESS_TOKEN,
        {expiresIn: '9h'});
};

export default createAccessToken;
