import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// console.log('🔥🔥🔥 DB FILE LOADED 🔥🔥🔥');

// console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// console.log('Testing database connection...');

export async function testDBConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Connected to database');
        console.log('Database time:', result.rows[0]);
    } catch (error) {
        console.error('Database connection failed');
        console.error(error);
    }
}