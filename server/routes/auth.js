import {createRefreshToken, createAccessToken} from './createTokens.js';
import bcryptjs from 'bcryptjs';
import express from 'express';
import User from '../models/User.js';
import signupValidation from '../validation/signupValidation.js';
import signinValidation from '../validation/signinValidation.js';

const auth = express.Router();
const hash = bcryptjs.hash;
const compare = bcryptjs.compare;

//root
auth.get('/',
    async (req,
           res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.json({message: err});
        }
    });

//specific user
auth.get('/:id',
    async (req,
           res) => {
        try {
            const getUser = await User.findById(req.params.id);
            res.json(getUser);
        } catch (err) {
            res.json({message: err});
        }
    });

auth.post('/signup',
    async (req,
           res) => {
        const {error} = signupValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const emailExists = await User.findOne({
            email: req.body.email
        })

        if (emailExists) {
            return res.status(400)
                .json({
                    message: 'Email already exists.'
                });
        }

        const hashedPassword = await hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            password: hashedPassword,
        });

        try {
            const savedUser = await newUser.save();
            res.json({user: savedUser._id});
        } catch (err) {
            res.json({message: err});
        }

    });

auth.post('/signin',
    async (req,
           res) => {
        const {error} = signinValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({email: req.body.email});

        if (!user) return res.status(400)
            .send('Email or password are wrong - please try again.');
        const validPass = await compare(req.body.password, user.password);
        if (!validPass) return res.status(400)
            .send('Email or password are wrong - please try again.');
        res.cookie('jid',
            createRefreshToken(user),
            {
                httpOnly: true,
                path: '/refresh_token'
            })
        return {
            accessToken: createAccessToken(user)
        }
    });

//update user
auth.patch('/:id',
    async (req,
           res) => {
        try {
            const oldUser = await User.findById(req.params.id);
            const updatedUser = await User.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        email: req.body.email ? req.body.email : oldUser.email,
                        fullName: req.body.fullName ? req.body.fullName :
                            oldUser.fullName,
                        password: req.body.password ? req.body.password :
                            oldUser.password
                    }
                });
            res.json(updatedUser);
        } catch (err) {
            res.json({message: err});
        }
    });

//delete user
auth.delete('/:id',
    async (req,
           res) => {
        try {
            const deletedUser = await User.deleteOne({
                _id: req.params.id
            });
            res.json(deletedUser);
        } catch (err) {
            res.json({message: err});
        }
    });

export default auth;
