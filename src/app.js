import express from 'express';

const app = express();

app.use(express.json());

// routes Import
import userRoute from './routes/userRoute.js';
// import postRoute from './routes/postRoute.js';
// routes declaration
app.use('/api/v1/users', userRoute);
// app.use('/api/v1/auth', postRoute);

// example of a route http://localhost:3000/api/v1/users/register

export default app;