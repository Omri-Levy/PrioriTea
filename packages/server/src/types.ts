import {Request, Response, NextFunction} from 'express';

export type Middleware = (req: Request, res: Response, next: NextFunction) => any;

export type RequestHandler = (req: Request, res: Response) => any;

export type ErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => any;
