import { getCurrentUser, setIsSignedIn } from './utils';
import cookieParser from 'cookie-parser';
import express from 'express';
import { signIn, signOut, signUp } from './auth.controller';
import { Method, restful } from '../middleware/restful';

export const auth = express.Router();

//add a new user to db
auth.post('/sign-up', signUp);

//sign in an existing user from db
auth.post('/sign-in', cookieParser(), signIn);

//sign in an existing user from db
auth.post('/sign-out', signOut);

auth.get('/current-user', getCurrentUser);

auth.post('/set-is-signed-in', setIsSignedIn);

auth.all('*', restful([Method.GET, Method.POST]));
