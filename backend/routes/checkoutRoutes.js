import express from 'express'
import { checkoutController } from '../controllers/checkoutController'
import { requireSignIn } from '../middlewares/authMiddleware'

const router = express.Router()

// order details save 
router.post('/order-details',requireSignIn,checkoutController)