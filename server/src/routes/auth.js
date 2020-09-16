import express from 'express';
import {
    deleteUser, findAllUsers, findUserById, signInUser, signUpUser,
    signOutUser, updateUser
} from '../controllers/auth.js';

const auth = express.Router();

//find all existing users from mongodb
auth.get('/', (req, res) => findAllUsers(req, res));

//find an existing user from mongodb by id
auth.get('/:id', (req, res) => findUserById(req, res));

//add a new user to mongodb
auth.post('/sign_up', (req, res) => signUpUser(req, res));

//sign in an existing user from mongodb
auth.post('/sign_in', (req, res) => signInUser(req, res));

//sign in an existing user from mongodb
auth.post('/sign_out', (req, res) => signOutUser(req, res));

//update an existing user from mongodb by id
auth.patch('/:id', (req, res) => updateUser(req, res));

//delete an existing user from mongodb by id
auth.delete('/:id', (req, res) => deleteUser(req, res));

export default auth;
