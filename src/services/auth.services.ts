import { findUserByEmail, createUser } from '../repositories/auth.repositories.js';
import bcrypt from 'bcryptjs';


export  async function registerUser(
    surname: string,
    lastname: string,
    middlename:string|null,
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
        lastname, 
        middlename, 
        email, 
        passwordHash);


        //
    return user;
} 
