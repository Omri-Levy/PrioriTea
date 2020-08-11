import express from 'express';
import {
    deleteUser,
    findAllUsers,
    findUserById,
    signinUser,
    signupUser,
    updateUser
} from '../controllers/auth.js';

const auth = express.Router();

//find all existing users from mongodb
auth.get('/', (req, res) => findAllUsers(req, res));

//find an existing user from mongodb by id
auth.get('/:id', (req, res) => findUserById(req, res));


//add a new user to mongodb
auth.post('/signup', (req, res) => signupUser(req, res));

//signin an existing user from mongodb
auth.post('/signin', (req, res) => signinUser(req, res));

//update an existing user from mongodb by id
auth.patch('/:id', (req, res) => updateUser(req, res));

//delete an existing user from mongodb by id
auth.delete('/:id', (req, res) => deleteUser(req, res));

export default auth;
