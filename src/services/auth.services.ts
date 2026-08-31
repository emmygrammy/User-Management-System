import { findUserByEmail, createUser , createOtp} from '../repositories/auth.repositories.js';
import bcrypt from 'bcryptjs';


export  async function registerUser(
    surname: string,
    last_name: string,
    middle_name:string|null,
    email:string,
    password: string
){
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser){
        throw new Error('User already exists')
    }
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

  // create user
    const user = await createUser(
        surname, 
        last_name, 
        middle_name, 
        email, 
        passwordHash);


        //
    return user;
} 

export async function loginUser(
    email:string,
    password: string
){
    //find user by email
    const user= await findUserByEmail(email);
    if (!user){
        throw new Error('incorrect email or password')
    }
    //compare password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch){
        throw new Error('incorrect email or password')
    }

    // generate a 6 digit otp
    const otp = Math.floor(
        Math.random() * 900000 + 100000)
        .toString();

        //hash otp
        const otpHash = await bcrypt.hash(otp, 10);

        //expires in 5 minutes
        const expiresAt = new Date(Date.now() +5 *60 * 1000);

        //create otp
        await createOtp(
            user.id,
            otpHash,
            expiresAt
        );
       
        // Temporary: we'll replace this with email later
        console.log(`OTP for ${email}: ${otp}`);
        
        return{
            message:'otp sent to your email',
        }


}