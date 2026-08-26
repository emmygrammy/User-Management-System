import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool, testDBConnection } from './config/db.js';
import { authRouter } from './routes/auth_route.js';
import { contactRouter } from './routes/contact_route.js';
import { userRouter } from './routes/user_route.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('User Management system running');
});

// Auth routes
app.use('/api/auth', authRouter);

// User routes
app.use('/api/users', userRouter);

app.use('/api/users', contactRouter);
// Contact routes
app.use('/api/contacts', contactRouter);



// Test database connection
testDBConnection();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});