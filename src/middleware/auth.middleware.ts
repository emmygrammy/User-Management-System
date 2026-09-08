import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
 
export interface AuthRequest extends Request {
    user?: {
        user_Id: string;
        email: string;
    };
}

export function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    try {
         console.log('1. Middleware reached');

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                message: 'Access token required'
            });
            return;
        }

        const token = authHeader.split(' ')[1];
        console.log('JWT SECRET EXISTS:', !!JWT_SECRET);
        console.log('TOKEN:', token);
         console.log('2. Token received');

        if (!token) {
            res.status(401).json({
                message: 'Invalid authorization header'
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
         console.log('3. Token verified');
        console.log('4. Decoded:', decoded);
        req.user = decoded as {
            user_Id: string;
            email: string;
        };
           console.log('5. Calling next()');
        next();

    } catch (error) {
        console.error('JWT ERROR:', error);
        res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
}