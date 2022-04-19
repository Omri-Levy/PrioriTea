import express from 'express';
import { signIn, signOut, signUp } from './auth.controller';

export const auth = express.Router();

//add a new user to mongodb
auth.post('/sign-up', signUp);

//sign in an existing user from mongodb
auth.post('/sign-in', signIn);

//sign in an existing user from mongodb
auth.post('/sign-out', signOut);
