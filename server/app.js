import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import getCurrentUser from './js/getCurrentUser.js';
import setLogin from './js/setLogin.js';
import auth from './routes/auth.js';
import task from './routes/task.js';

(async () => {
    const app = express();

    app.set('proxy', 1);
    app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true}));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    //route middlewares
    app.use('/api/user', auth);
    app.use('/api/task', task);
    app.post('/api/auth', setLogin);
    app.post('/api/get_current_user', getCurrentUser);
    app.use('/api/user/signin', cookieParser());

    //connect to db
    await mongoose.connect(process.env.DATABASE_URL,
        {
            useNewUrlParser: true, useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        },
        () => console.log('connected to db'))
        .catch(err => console.error(err));

    //webserver
    app.listen(parseInt(process.env.PORT), () => console.log(
        `Listening on port ${process.env.PORT}`));
})();
