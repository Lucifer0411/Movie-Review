import express from 'express';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import cors from 'cors'
import errorHandler from './middlewares/errorHandlerMiddleware.js';
import path from 'path'

connectDB();

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:false}))



const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,'uploads','images')))
dotenv.config();
const port=process.env.PORT

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// app.use(cors({
//     origin: '*', // Allow only your frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // Include if you need cookies to be sent
//   }));

app.use(cors({
  origin: '*', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers used in requests, like Content-Type and Authorization
  credentials: true, // If you need cookies or other credentials
}));


app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)
app.use('/api/reviews',reviewRouter)

// Global error handler middleware
app.use(errorHandler);


app.listen(port,()=>console.log(`server started on ${port}`))
