import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import {  braintreeTokenController, categoryFilterProduct, createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productPhotoController, searchProductController, updateProductController } from '../controllers/productController.js';

const router = express.Router();

// routes

// Create Product

router.post('/create-product', requireSignIn , formidable(), createProductController);

// get products 
router.get('/get-product',getProductController)

// get single product
router.get('/get-product/:slug',getSingleProductController)

// get photo 
router.get('/product-photo/:pid',productPhotoController)

// product filter
router.post('/product-filters',productFiltersController)

//search Route 
router.get('/search/:keyword',searchProductController)

// product filter using category filter
router.get("/filter-category/:slug",categoryFilterProduct)

// delete product
router.delete('/delete-product/:pid',deleteProductController)

// update product
router.patch('/update-product/:id',updateProductController)

// getting braintree tokren
router.get('/braintree/token',braintreeTokenController)

export default router;

