import mongoose from  "mongoose";

const connectDB= async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully")
    }catch(error){
        console.log("error on connecting to mongoDb",error.mongoose)
    }
}
export default connectDB;