
import express from 'express'
import { contactQueryController, deleteContactController, getContactController } from '../controllers/contactController.js'

const router = express.Router()

// create contact query controller
router.post('/contact-form',contactQueryController)

// get all queries route
router.get('/all-queries',getContactController)

// delete query route
router.delete('/delete-query/:id',deleteContactController)

export default router;