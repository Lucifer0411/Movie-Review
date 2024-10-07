import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config()

console.log('url',process.env.MONGO_URL);

const connectDB=async()=>{
    try {
        const conn= await mongoose.connect("mongodb+srv://sanjay0411:sanjay0411@moviereview.hypn9.mongodb.net/?retryWrites=true&w=majority&appName=MovieReview")
        console.log(`database is connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting to the database ${error.message}`);
        process.exit(1)
        
    }
}

// const conn= await mongoose.connect("mongodb+srv://sanjay0411:sanjay0411@moviereview.hypn9.mongodb.net/?retryWrites=true&w=majority&appName=MovieReview")
//         console.log(`database is connected ${conn.connection.host}`);
export default connectDB;