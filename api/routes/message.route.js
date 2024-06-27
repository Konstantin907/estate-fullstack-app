import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { 
    getMessages
} from '../controllers/message.controller.js';

const router = express.Router()

router.get('/:chatId',verifyToken ,getMessages);


export default router;