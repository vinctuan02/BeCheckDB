import express from "express"
import cors from 'cors'
import initWebRouter from './Router/index'
import { connectDB } from "./DB/connectDB"

// require('dotenv').config()

let app = express()
app.use(express.json());

const allowedOrigins = ['http://10.10.12.15:3000', 'http://10.10.12.15:3001'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};


app.use(cors(corsOptions));

// Middleware để bắt lỗi CORS
app.use((err, req, res, next) => {
    if (err && err.name === 'CorsError') {
        console.error('CORS error:', err.message);
        res.status(403).send('CORS error: Access Denied');
    } else {
        next(err);
    }
});

initWebRouter(app)

connectDB()

app.listen(3001, () => {
    console.log("Backend nodejs is running s", 3001)
})


//v1