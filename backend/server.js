import express from 'express';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import cors from 'cors'

connectDB();

const app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))
dotenv.config();
const port=process.env.PORT


app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)


app.listen(port,()=>console.log(`server started on ${port}`))
console.log('connection close');


// app.listen(port,()=>console.log(`server started on ${port}`))
