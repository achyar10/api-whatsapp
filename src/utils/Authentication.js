import jwt from 'jsonwebtoken'

class Authentication {

    static generateToken = (payload) => {
        const secretKey = process.env.SECRET_KEY || 'secret'
        const token = jwt.sign(payload, secretKey)
        return token
    }

}

export default Authentication