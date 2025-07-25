// import jwt from 'jsonwebtoken'
// export const authenticate = async (req, res, next) => {
//     try {
//         const token = req.cookies.access_token
//         if (!token) {
//             return next(403, 'Unathorized')
//         }
//         const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
//         console.log('Decoded:', decodeToken)
//         req.user = decodeToken
//         next()
//     } catch (error) {
//         next(500, error.message)
//     }
// }

import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: No token provided',
            });
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decodeToken);
        req.user = decodeToken;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// import jwt from 'jsonwebtoken';

// export const authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.access_token;

//     if (!token) {
//       return res.status(403).json({
//         success: false,
//         message: 'Unauthorized: No token provided',
//       });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid or expired token',
//     });
//   }
// };
