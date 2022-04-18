import express from 'express';
import { signIn, signOut, signUp } from './auth.controller';

export const auth = express.Router();

//add a new user to mongodb
auth.post('/sign-up', (req, res) => signUp(req, res));

//sign in an existing user from mongodb
auth.post('/sign-in', (req, res) => signIn(req, res));

//sign in an existing user from mongodb
auth.post('/sign-out', (req, res) => signOut(req, res));
