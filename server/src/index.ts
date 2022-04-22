import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import express, {
  Request,
  urlencoded,
  json,
  Response,
  RequestHandler,
} from "express";
import { hash, verify as verifyArgon2 } from "argon2";
import { sign, verify as verifyJwt } from "jsonwebtoken";
import { DeleteResult, Repository, DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { InjectRepository, Container } from "typeorm-typedi-extensions";
import { Service } from "typedi";
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Middleware as Use,
} from "@overnightjs/core";
import { JwtPayload, Method, Route, User as UserType } from "./types";
import winston from "winston";
import {
  isDev,
  logger,
  Expiration,
  getUser,
  JwtUtils,
  PassUtils,
} from "./utils";
import {
  BadRequestError,
  CustomError,
  DatabaseConnectionError,
  MethodNotAllowed,
  NotFoundError,
  RequestValidationError,
  UnauthorizedError,
} from "./errors";
import {
  CreatedResponse,
  ExpressResponse,
  OkResponse,
  SomethingWentWrongResponse,
} from "./responses";
import {
  CORS_ORIGIN,
  DATABASE_URL,
  DOMAIN,
  NODE_ENV,
  PORT,
  SECRET_ACCESS_TOKEN,
  BASE_URL,
} from "./env";
import { auth, errorHandler, morgan, restful } from "./middleware";
import { Validate } from "./decorators";
import { UsersModule, User } from "./users";
import { AuthModule } from "./auth";
import { Task, TasksModule } from "./tasks";

export {
  // Env vars
  NODE_ENV,
  PORT,
  DATABASE_URL,
  CORS_ORIGIN,
  SECRET_ACCESS_TOKEN,
  DOMAIN,
  BASE_URL,
  // Types
  Method,
  Route,
  UserType,
  JwtPayload,
  DeleteResult,
  Repository,
  Request,
  Response,
  RequestHandler,
  Factory,
  // Errors
  CustomError,
  NotFoundError,
  MethodNotAllowed,
  RequestValidationError,
  BadRequestError,
  DatabaseConnectionError,
  UnauthorizedError,
  // Responses
  ExpressResponse,
  OkResponse,
  CreatedResponse,
  SomethingWentWrongResponse,
  // Route decorators
  Use,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  // Decorators
  Validate,
  // App utils
  Seeder,
  Expiration,
  winston,
  logger,
  getUser,
  isDev,
  // Middleware
  urlencoded,
  cookieParser,
  json,
  cors,
  helmet,
  morgan,
  errorHandler,
  restful,
  auth,
  // Validation
  // signUpSchema,
  // signInSchema,
  // taskSchema,
  // Jwt
  verifyJwt,
  sign,
  JwtUtils,
  // argon2
  hash,
  verifyArgon2,
  PassUtils,
  // Entities
  User,
  Task,
  // Requirements
  Service,
  InjectRepository,
  Container,
  DataSource,
  // Routes
  UsersModule,
  AuthModule,
  TasksModule,
  // Core
  express,
};
