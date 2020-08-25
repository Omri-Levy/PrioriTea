import createAccessToken from '../js/createAccessToken.js';
import sendAccessToken from '../js/sendAccessToken.js';
import User from '../models/User.js';
import signupValidation from '../validation/signupValidation.js';
import signinValidation from '../validation/signinValidation.js';
import argon2 from 'argon2';

const {hash, verify} = argon2;

/**
 @path /api/user/
 @request get
 @desc get all users from mongodb
 */
const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({message: err});
    }
}

/**
 @path /api/user/:id
 @request get
 @desc get a user by id from mongodb
 */
const findUserById = async (req, res) => {
    try {
        const getUser = await User.findById(req.params.id);
        res.json(getUser);
    } catch (err) {
        res.json({message: err});
    }
}

/**
 @path /api/user/signup
 @request post
 @desc add a new user to mongodb
 */
const signupUser = async (req, res) => {
    const {error} = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({email: req.body.email});

    if (emailExists) return res.status(400).json({
        message: 'Email already exists.'
    });

    const hashedPassword = await hash(req.body.password);

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
}

/**
 @path /api/user/signin
 @request post
 @desc signin an existing user from mongodb
 */
const signinUser = async (req, res) => {
    const {error} = signinValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});

    if (!user) return res.status(400).send(
        'Email or password are wrong - please try again.');
    const validPass = await verify(user.password, req.body.password);
    if (!validPass) return res.status(400).send(
        'Email or password are wrong - please try again.');
    try {
        sendAccessToken(res, createAccessToken(user));
        return res.status(200).send({success: true});
    } catch (err) {
        console.log(err);
    }
};

/**
 @path /api/user/signout
 @request post
 @desc signout an existing user from mongodb
 */
const signoutUser = async (req, res) => {
    try {
        sendAccessToken(res, '');
        return res.status(200).send({success: true});
    } catch (err) {
        console.log(err);
        return res.status(400).send({success: false});
    }
};

/**
 * @path /api/user/:id
 * @request patch
 * @desc update an existing user from mongodb
 */
const updateUser = async (req, res) => {
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
}

/**
 * @path /api/user/:id
 * @request delete
 * @desc delete an existing user from mongodb
 */
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({
            _id: req.params.id
        });
        res.json(deletedUser);
    } catch (err) {
        res.json({message: err});
    }
}

export {
    findAllUsers,
    findUserById,
    signupUser,
    signinUser,
    signoutUser,
    updateUser,
    deleteUser
};
