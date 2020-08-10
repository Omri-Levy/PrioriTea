import * as jwt from 'jsonwebtoken';

const sign = jwt.sign

export const createAccessToken = (user) => {
    return {
        token: sign({_id: user._id},
            process.env.SECRET_TOKEN,
            {
                expiresIn: '15m'
            })
    }
}

export const createRefreshToken = (user) => {
    return {
        token: sign({_id: user._id},
            process.env.REFRESH_TOKEN,
            {
                expiresIn: '30m'
            })
    }
}
