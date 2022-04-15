import express from 'express';
import { signInUser, signOutUser, signUpUser } from '../controllers/auth.js';

export const auth = express.Router();

//add a new user to mongodb
auth.post('/sign_up', (req, res) => signUpUser(req, res));

//sign in an existing user from mongodb
auth.post('/sign_in', (req, res) => signInUser(req, res));

//sign in an existing user from mongodb
auth.post('/sign_out', (req, res) => signOutUser(req, res));
