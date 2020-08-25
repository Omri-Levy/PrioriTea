import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import setLogin from './js/setLogin.js';
import auth from './routes/auth.js';
import task from './routes/task.js';

const app = express();
const serverHost = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.SERVER_PORT || 4000;
const corsOriginHost = process.env.CORS_ORIGIN_HOST || 'localhost';
const corsOriginPort = process.env.CORS_ORIGIN_PORT || 8080;

(async () => {
    app.use(cors({
        origin: `http://${corsOriginHost}:${corsOriginPort}`,
        credentials: true
    }));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    //route middlewares
    app.use('/api/user', auth);
    app.use('/api/task', task);
    app.post('/api/auth', setLogin);
    app.use('/api/user/signin', cookieParser());

    //connect to db
    await mongoose.connect(process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        },
        () => console.log('connected to db'))
        .catch(err => console.error(err));

//webserver
    app.listen(serverPort, serverHost,
        () => console.log(`Listening on port ${serverPort}`));
})();
