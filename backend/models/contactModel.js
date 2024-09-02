import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    search : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
})

export default mongoose.model('Contact',contactSchema);