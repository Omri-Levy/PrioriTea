import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import auth from './routes/auth.js';
import task from './routes/task.js';

const app = express();
const PORT = process.env.PORT || 4000;

(async () => {
    app.use(cors({
        origin: 'http://localhost:8080',
        credentials: true
    }));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());


    //route middlewares
    app.use('/api/user', auth);
    app.use('/api/task', task);

    //root
    app.get('/', (req, res) => res.send('Home page'));


    //connect to db
    await mongoose.connect(process.env.DB_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        },
        () => console.log('connected to db'))
        .catch(err => console.error(err));

//webserver
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
