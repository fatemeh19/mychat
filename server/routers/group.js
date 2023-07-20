import express from 'express'
const router = express.Router()
import { addMember } from '../controllers/groupController.js'


router.patch('/addMember/:groupId', addMember)


export default router