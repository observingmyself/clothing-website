import checkoutModel from "../models/checkoutModel.js";

export const checkoutController = async(req,res) => {
    try{
        const {address,address2,city,state,pincode,userId,productId} = req.body;
        if (!address) {
            return res.status(400).send({ message: 'Address is required' });
        }
        if (!address2) {
            return res.status(400).send({ message: 'Address2 is required' });
        }
        if (!city) {
            return res.status(400).send({ message: 'City is required' });
        }
        if (!state) {
            return res.status(400).send({ message: 'State is required' });
        }
        if (!pincode) {
            return res.status(400).send({ message: 'Pincode is required' });
        }
        const {nonce,cart} = req.body;
        let total = 0;
        cart.map((i)=>total += i.price)
newTransaction = gateway.transaction.sale(
    {
      amount : total,
      paymentMethodNonce : nonce,
      options : {
        submitForSettlement : true,
      },
    },
    function (err,result){
        if(result){
        const checkout = new checkoutModel({
          address: address, // Fixed here
          address2: address2,
          city: city,
          state: state,
          pincode: pincode,
          userId: userId,
          productId: productId,
          payment: result
        }).save();
        res.json({ok : true});
    }
    else{
        console.log(err)
    }
    }
);


    }catch(error){
        console.error(error);
        res.status(500).send({
            success : false,
            message : 'Error while checkout',
            error : error.message
        })
    }
}