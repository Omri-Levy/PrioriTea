import {
	PORT,
	DATABASE_URL,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
	NODE_ENV,
} from './env';
import { Method, Route, User } from './types';
import {
	CustomError,
	NotFoundError,
	MethodNotAllowed,
	RequestValidationError,
	BadRequestError,
	DatabaseConnectionError,
	UnauthorizedError,
} from './errors';
import { Service as InjectService } from 'typedi';
import { isDev, logger, getUser } from './utils';
import { router, Server } from './express';
import { morgan, errorHandler, restful } from './middleware';
import { prisma } from './db';
import { app } from './app';
import {
	HttpMethod,
	Get,
	Post,
	Put,
	Patch,
	Delete,
	All,
	Controller,
	Middleware,
} from './decorators';
import { UserController, UserService, UserModel } from './users';
import {
	AuthController,
	AuthService,
	signInSchema,
	signUpSchema,
	sendAccessToken,
	createAccessToken,
} from './auth';

export {
	// Env
	NODE_ENV,
	PORT,
	DATABASE_URL,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
	// Types
	Method,
	Route,
	User,
	// Errors
	CustomError,
	NotFoundError,
	MethodNotAllowed,
	RequestValidationError,
	BadRequestError,
	DatabaseConnectionError,
	UnauthorizedError,
	// Avoid controllers having a @Service decorator
	// causing confusion.
	InjectService,
	// Route decorators
	HttpMethod,
	Get,
	Post,
	Put,
	Patch,
	Delete,
	All,
	Controller,
	Middleware,
	// App utils
	logger,
	getUser,
	isDev,
	//Middleware
	morgan,
	errorHandler,
	restful,
	// Validation
	signUpSchema,
	signInSchema,
	// Jwt
	createAccessToken,
	sendAccessToken,
	// argon2
	// Routes
	UserController,
	UserService,
	UserModel,
	AuthController,
	AuthService,
	// AuthModel,
	// Core
	router,
	Server,
	prisma,
	app,
};
