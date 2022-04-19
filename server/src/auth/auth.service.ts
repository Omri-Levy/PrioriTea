import express from 'express';
import { signIn, signOut, signUp } from './auth.controller';

export const auth = express.Router();

//add a new user to db
auth.post('/sign-up', signUp);

//sign in an existing user from db
auth.post('/sign-in', signIn);

//sign in an existing user from db
auth.post('/sign-out', signOut);
