import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;

export function generateToken(user_Id: string, email: string) {
    const token = jwt.sign(
        {
            user_Id,
            email,
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
        }
    );

    console.log('JWT SECRET USED TO SIGN:', JWT_SECRET);
    console.log('GENERATED TOKEN:', token);

    return token;
}