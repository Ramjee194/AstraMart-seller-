import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    vendor:{
        type:mongoose.Schema.Types.ObjectId,ref:'Vender',required:true
    },
    title:{
        type:String

    },
    description:{type:String},
    price:{type:Number,required:true},
    images:[{url:String,key:String}], //s3 keys
    category:{type:String,required:true},
    stock:{type:Number,default:0},
    rating:{type:Number,default:0},
    totalSales:{type:Number,default:0},
    createdAt:{type:Date,default:Date.now}
});
productSchema.index({ title: 'text', description: 'text', category: 'text' });

export default mongoose.model("Product", productSchema);
