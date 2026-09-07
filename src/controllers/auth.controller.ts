import { Request, Response } from 'express';
import { 
    registerUser as registerUserService, 
    loginUser as loginUserService, 
    verifyOTP as verifyOTPService } from '../services/auth.services.js';



export  async function registerUser (req: Request, res: Response)  {
    try{
         //logic  to register
         const { surname, last_name, middle_name, email, password } = req.body;
        
         const user = await registerUserService(
            surname, 
            last_name, 
            middle_name, 
            email, 
            password);
        
        res.status(201).json({
            message:'user registered successfully'
        })

    }catch(error){
        console.log(error)
        if (error instanceof Error && error.message === 'User already exists') {
            res.status(409).json({
                message: error.message
            });
            return;
        }


        res.status(500).json({
            message:'internal server error'
        })
    }
}

export async function loginUser (req: Request, res: Response) {
     try{ 
         const { 
            email, 
            password 
        } = req.body;

         const result = await loginUserService(
            email, 
            password);

        res.status(200).json(result)

     }catch(error){
        console.log(error)
         if (
            error instanceof Error &&
            error.message === 'Invalid email or password'
        ) {
            res.status(401).json({
                message: error.message
            });
            return;
        }

        res.status(500).json({
            message:'internal server error'
        })
     }
}

 export async function verifyOTP(req: Request, res: Response) {
    try{

        const { 
            email, 
            otp 
        } = req.body;

        const result  = await verifyOTPService(email, otp);
        res.status(200).json(result)

    }catch(error){
        console.log(error)

           if (error instanceof Error) {
            if (error.message === 'User not found') {
                res.status(404).json({
                    message: error.message
                });
                return;
            }

            if (
                error.message === 'OTP not found' ||
                error.message === 'Invalid OTP' ||
                error.message === 'OTP has expired' ||
                error.message === 'OTP already verified'
            ) {
                res.status(401).json({
                    message: error.message
                });
                return;
            }
        }

        res.status(500).json({
            message:'internal server error'
        })
    }
 }
