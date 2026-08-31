import { pool } from '../config/db.js';

// Find user by email
export async function findUserByEmail(email:string){
    const result =  await pool.query(
        'SELECT * FROM users WHERE email=$1',
        [email]);
    return result.rows[0]
}

// Create user
export async function createUser(
    surname: string,
    last_name: string,
    middle_name:string|null,
    email:string,
    passwordHash: string
){
const result = await pool.query(
    `INSERT INTO users(surname, last_name,middle_name, email, password_hash)
    VALUES($1,$2,$3,$4,$5)
    RETURNING id, surname, last_name, middle_name,email, created_at`,
    [surname, last_name, middle_name, email, passwordHash]
)
return result.rows[0]
}

// create otp

export async function createOtp(
     user_Id: string,
    code_hash: string,
    expires_at: Date
){
   const result = await pool.query(
    `INSERT INTO otps
    (user_id, code_hash, expires_at, attempts)
    VALUES($1,$2,$3,$4)
    RETURNING id, user_id, code_hash, expires_at`,
    [user_Id, code_hash, expires_at,0]
   )

   return result.rows[0]

}