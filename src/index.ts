import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool, testDBConnection } from './config/db.js';
import { authRouter } from './routes/auth_route.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('User Management system running');
});

// Auth routes
app.use('/api/auth', authRouter);


// Test database connection
testDBConnection();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});