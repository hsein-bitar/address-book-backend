import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

// routers/controllers imports
import UserController from './controllers/UserController';
import ContactController from './controllers/ContactController';

// get a database connection instance
const DB_CONNECT = process.env.DB_CONNECT;
mongoose.connect(DB_CONNECT)
    .then(res => console.log("DB conencted, model names: ", res.modelNames()))
    .catch(err => console.log(err))

const app: Express = express();
app.use(cors())
app.use(express.json())

// grouping routes
app.use('/api/user', UserController);
app.use('/api/contact', ContactController);

// start server
app.listen(process.env.PORT, () => {
    console.log(`🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});
