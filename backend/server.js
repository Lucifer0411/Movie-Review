import { connect } from 'mongoose'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

dotenv.config();

connectDB();
console.log('connection close');


// app.listen(port,()=>console.log(`server started on ${port}`))
