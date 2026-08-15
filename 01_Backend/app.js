import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extends: true}))
app.use(express.static("public"))
app.use(cookieParser());

//routes imoort
import userRouter from './src/routes/user.routes.js'
import videoRouter from './src/routes/video.routes.js'

//routes declaration
app.use('/api/v1/user', userRouter);
app.use('/api/v1/video', videoRouter)

export default app