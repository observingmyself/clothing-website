import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import checkoutModel from "../models/checkoutModel.js";
import fs from "fs";
import slugify from 'slugify';
import braintree from "braintree";
var gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox,
      merchantId: '9ccqvvfwsb96x78f',
      publicKey: 'r34gbrcx7vdcc6yc',
      privateKey: '1d94111054a4d61d1ac113b7a63d7b3e',
    });

   // create product
export const createProductController = async (req, res) => {
    try{
        const {name,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files
    
        // validation 
        
        switch(true){
            case !name:
                return res.status(400).send({message: 'Name is required'})
            case !description:
                return res.status(400).send({message: 'Description is required'})
            case !price:
                return res.status(400).send({message: 'Price is required'})
            case !category:
                return res.status(400).send({message: 'Category is required'})
            case!quantity:
                return res.status(400).send({message: 'Quantity is required'})
            case!shipping:
                return res.status(400).send({message: 'Shipping is required'})
            case photo && photo.size > 1000000:
            return res  
                 .status(400)
                 .send({message: 'Photo size should be less than 1MB'})
        }
        const products = new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product: products
        })

    }catch(error){
        console.log(error);
        res.status(500).send({message: 'Error in creating product'})
    }
   
}

// get product controller
export const getProductController = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "All Products ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };
  // get single product
  export const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel

        .findOne({ slug: req.params.slug})
        .select("-photo")
        .populate("category");
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };
  
  // get photo
  export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };

  export const productFiltersController = async (req,res) => {
    try{
      const {checked,radio} = req.body;
      let args = {};
      if(checked.length > 0) args.category = checked
      if(radio.length) args.price = {$gte : radio[0],$lte : radio[1]};
      
      const products = await productModel.find(args)
      res.status(200).send({
        success : true,
        products
      })
    }
    catch(error){
      console.log(error)
      res.status(400).send({
        success : false,
        message : 'Error in Filtering Products',
        error
      })
    }
  }


  // search products 

  export const searchProductController = async(req,res) => {
    try{
      const {keyword} = req.params;
    const results = await productModel
    .find({
      $or : [
        {name : {$regex : keyword , $options : 'i'}},
        {description : {$regex : keyword , $options : 'i'}}
      ]
    })
    .select("-photo");
    res.json(results)
    }
    catch(error){
      console.log(error)
      res.status(500).send({
        success : false,
        message : "Error while searching products",
        error,
      });
    }
  }

  export const deleteProductController = async (req,res) => {
    try{
      
      await productModel.findByIdAndDelete(req.params.pid)
      res.status(200).send({
        success : true,
        message : "Product Deleted"
      })
    }
    catch(error){
      console.log(error)
      res.status(500).send({
        success : false,
        message : "Error Deleting Product",
        error
      })
    }

  }


  // update controller 

  export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();  
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };

  export const categoryFilterProduct = async(req,res) => {
    try{
      const category = await categoryModel.findOne({slug: req.params.slug})
      const product = await productModel.find({category}).populate('category')
      res.status(200).send({
        success : true,
        message : "Product fetched based on category",
        category,
        product,
      })
    }catch(error){
      console.log(error)
      res.status(500).send({
        success : false,
        message : "Error while getting category",
        error
      })
    }
  }

  // payment gateway api 
  // token
  export const braintreeTokenController = async(req,res) => {
    try{
      gateway.clientToken.generate({},function(err,response){
        if(err){
          res.status(500).send({err})
        }
        else{
          res.send(response)
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  
  
  



