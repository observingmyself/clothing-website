import contactModel from "../models/contactModel.js";


export const contactQueryController = async(req,res) => {
    try{
        const {name , search , phone} = req.body;
     switch(true){
         case !name : 
         return res.status(400).send({message : 'Name is required'});
         case !search : 
         return res.status(400).send({message : 'Query is required'});
         case !phone :
         return res.status(400).send({message : 'Phone is required'});
     }
     const contact = new contactModel({
         name,
         search,
         phone,
     })
     await contact.save();
     res.status(201).send({
         success : true,
         message : "Query Placed We'll response shortly",
     })
 }catch(error){
     console.log(error)
     res.status(500).send({
         success : false,
         message : "Error Placing Query"
     })
 }
 
 }

export const getContactController = async(req,res) => {
    try{
        const contact = await contactModel.find({})
        res.status(200).send({
            success : true,
            message : "All Queries",
            contact,
        })
    }catch(error){
        console.error(error)
        res.status(500).send({
            success : false,
            message : "Error Getting Queries",
            error : error.message
        })
    }
}

export const deleteContactController = async(req,res) => {
    try{
        const {id} = req.params
        await contactModel.findByIdAndDelete(id)
        res.status(200).send({
            success : true,
            message : "Query Deleted"
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error Deleting Query",
            error : error.message
        })
    }
}