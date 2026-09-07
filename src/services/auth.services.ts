import { findUserByEmail, createUser , createOtp, findLatestOTP, markOTPAsVerified} from '../repositories/auth.repositories.js';
import bcrypt from 'bcryptjs';


// Register user
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

// Login user
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

// Verify OTP
 export async function verifyOTP(
    email: string,
    otp: string
) {
    // Find user by email
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    // Find latest OTP
    const otpRecord = await findLatestOTP(user.id);

    if (!otpRecord) {
        throw new Error('OTP not found');
    }

    // Check if OTP has already been verified
    if (otpRecord.verified_at) {
        throw new Error('OTP already verified');
    }

    // Check if OTP has expired
    if (new Date() > new Date(otpRecord.expires_at)) {
        throw new Error('OTP has expired');
    }

    // Compare entered OTP with hashed OTP
    const otpMatch = await bcrypt.compare(
        otp,
        otpRecord.code_hash
    );

    if (!otpMatch) {
        throw new Error('Invalid OTP');
    }

    // Mark OTP as verified
    await markOTPAsVerified(otpRecord.id);

    return {
        message: 'OTP verified successfully'
    };
}