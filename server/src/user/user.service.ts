import express from 'express';
import {
	findAllUsers,
	findUserById,
	updateUser,
	deleteUser,
} from './user.controller';

export const user = express.Router();

//find all existing users from db
user.get('/', findAllUsers);

//find an existing user from db by id
user.get('/:id', findUserById);

//update an existing user from db by id
user.patch('/:id', updateUser);

//delete an existing user from db by id
user.delete('/:id', deleteUser);
