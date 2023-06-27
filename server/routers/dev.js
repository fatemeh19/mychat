import  express  from "express";
const router = express.Router()

import { deleteAll,deleteChats,deleteMessages,deleteUsers } from "../controllers/devController.js";

router.delete('/',deleteAll)
router.delete('/chat',deleteChats)
router.delete('/user',deleteUsers)
router.delete('/message',deleteMessages)

export default router



