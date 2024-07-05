import express from "express"
import cors from 'cors'
import initWebRouter from './Router/index'
import { connectDB } from "./DB/connectDB"

// require('dotenv').config()

let app = express()
app.use(express.json());

app.use(cors({
<<<<<<< HEAD
    origin: 'http://10.10.12.15:3000', // 
=======
    origin: 'http://10.10.12.15:3001', // 
>>>>>>> dc07887368d43efe3998690b6b624eb855bfd649
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

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
