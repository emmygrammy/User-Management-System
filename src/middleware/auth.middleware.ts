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
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                message: 'Access token required'
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({
                message: 'Invalid authorization header'
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded as {
            user_Id: string;
            email: string;
        };

        next();

    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
}