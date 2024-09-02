import express from 'express'
import { createCategoryController , updateCategoryController , categoryControlller, deleteCategoryCOntroller,singleCategoryController } from '../controllers/categoryController.js'
import { isAdmin , requireSignIn  } from '../middlewares/authMiddleware.js'

const router = express.Router()


// Create category

router.post('/create-category', requireSignIn, isAdmin ,createCategoryController)

// update category

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//getALl category
router.get("/get-category",categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryCOntroller);



export default router