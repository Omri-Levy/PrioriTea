import winston from 'winston';
import { isDev } from './isDev';

winston.addColors({
	error: `red`,
	warn: `yellow`,
	info: `green`,
	http: `magenta`,
	debug: `white`,
});

export const logger = winston.createLogger({
	level: isDev() ? `debug` : 'warn',
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		debug: 4,
	},
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.timestamp({ format: `YYYY-MM-DD HH:mm:ss:ms` }),
		winston.format.colorize({ all: true }),
		winston.format.printf(function (info) {
			return `${info.timestamp} ${info.level}: ${info.message}`;
		}),
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: `logs/error.log`,
			level: `error`,
		}),
		new winston.transports.File({ filename: `logs/all.log` }),
	],
});
