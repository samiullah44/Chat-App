import mongoose from "mongoose";
import dotenv from "dotenv"

export const connectDB=async ()=>{
  try{
   const conn= await mongoose.connect(process.env.MONGODB_URI);
   console.log(`MOngoDB connected: ${conn.connection.host}`);
  }
  catch(error){
   console.log(`MOngoDB connection error`,error);
    
  }
};