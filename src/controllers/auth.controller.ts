import { Request, Response } from 'express';



export  async function registerUser (req: Request, res: Response)  {
    try{
         //logic  to register
        res.status(201).json({
            message:'user registered successfully'
        })

    }catch(error){
        console.log(error)
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
