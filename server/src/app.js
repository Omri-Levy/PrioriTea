import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { setIsSignedIn, getCurrentUser } from './auth';
import { auth } from './auth';
import { task } from './task';
import morgan from 'morgan';

export const app = express();

app.set('trust proxy', 1);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

//route middlewares
app.use('/api/auth', auth);
app.use('/api/task', task);
app.use('/api/auth/sign-in', cookieParser());
app.post('/api/get-current-user', getCurrentUser);
app.post('/api/auth', setIsSignedIn);
