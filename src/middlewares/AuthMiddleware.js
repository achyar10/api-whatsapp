import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ status: false, message: 'Not Authenticated' })
    }

    const secretKey = process.env.SECRET_KEY || 'secret'
    const token = req.headers.authorization.split(' ')[1]

    try {
        const credential = jwt.verify(token, secretKey)
        if (credential) {
            res.locals = credential
            return next()
        }
        return res.json({ status: false, message: 'Token invalid' })
    } catch (error) {
        console.log(error.message)
        return res.json({ status: false, message: error.message })
    }

}