import express from 'express';

const user = express.Router();

//find all existing users from mongodb
user.get('/', (req, res) => findAllUsers(req, res));

//find an existing user from mongodb by id
user.get('/:id', (req, res) => findUserById(req, res));

//update an existing user from mongodb by id
user.patch('/:id', (req, res) => updateUser(req, res));

//delete an existing user from mongodb by id
user.delete('/:id', (req, res) => deleteUser(req, res));
