import {
	PORT,
	DATABASE_URL,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
	NODE_ENV,
} from './env';
import { Method, Route, User, JwtPayload } from './types';
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
import { UserModel, UserService, UserController } from './users';
import {
	AuthService,
	AuthController,
	signInSchema,
	signUpSchema,
	PassUtils,
	JwtUtils,
	isAuth,
} from './auth';
import { TaskModel, TaskService, TaskController, taskSchema } from './tasks';

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
	JwtPayload,
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
	isAuth,
	// Validation
	signUpSchema,
	signInSchema,
	taskSchema,
	// Jwt
	JwtUtils,
	// argon2
	PassUtils,
	// Routes
	UserModel,
	UserService,
	UserController,
	AuthService,
	AuthController,
	TaskModel,
	TaskService,
	TaskController,
	// Core
	router,
	Server,
	prisma,
	app,
};
