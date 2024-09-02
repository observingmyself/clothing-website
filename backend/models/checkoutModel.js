import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema({
    address : {
        type : String,
        required : true
    },
    address2 : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    pincode : {
        type : Number,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Products'}],
    payment : {},
    status : {
        type : String,
        default : "Not Process",
        enum : ["Not Process","Processing","Shipped","Delivered","cancel"]
    }
},{timestamps : true})

export default mongoose.model('checkout',CheckoutSchema)