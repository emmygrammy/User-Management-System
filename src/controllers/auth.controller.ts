import { Request, Response } from 'express';
import { registerUser as registerUserService } from '../services/auth.services.js';



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

        res.status(200).json({message:'user logged in successfully'})

     }catch(error){
        console.log(error)

        res.status(500).json({
            message:'internal server error'
        })
     }
}

 export async function verifyOTP(req: Request, res: Response) {
    try{
        res.status(200).json({
            message:'otp verified successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:'internal server error'
        })
    }
 }
