import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//import routes
import auth from './routes/auth.js';

import task from './routes/task.js';

//route middlewares
app.use('/api/user', auth);
app.use('/api/task', task);

//routes

//root
app.get('/', (req, res) => res.send('Home page'));

//connect to db

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => console.log('connected to db'))
    .catch(err => console.log(err));

//webserver
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
