import * as jwt from 'jsonwebtoken';

const sign = jwt.sign

const createAccessToken = (user) => {
    return {
        token: sign({_id: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '15m'
            })
    }
}

const createRefreshToken = (user) => {
    return {
        token: sign({_id: user._id},
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '30m'
            })
    }
}

export {
    createAccessToken,
    createRefreshToken
}
