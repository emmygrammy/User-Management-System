import express from 'express';
import { registerUser, loginUser, verifyOTP } from '../controllers/auth_controller.js';



export const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/verify', verifyOTP);

