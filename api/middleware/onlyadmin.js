import jwt from 'jsonwebtoken'
import { handleError } from '../helpers/handleError.js'
export const onlyadmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        console.log('Cookies:', req.cookies)

        if (!token) {
            return next(handleError(403, 'Unathorized'))
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if (decodeToken.role === 'admin') {
            req.user = decodeToken
            return next()
        } else {
            return next(handleError(403, 'Unathorized'))
        }
    } catch (error) {
        next(handleError(500, error.message))
    }
}