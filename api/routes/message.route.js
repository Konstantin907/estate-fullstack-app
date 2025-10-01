import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { 
    addMessage,
    getMessages
} from '../controllers/message.controller.js'

const router = express.Router()

router.get('/:chatId',verifyToken ,getMessages);
router.post('/:chatId', verifyToken, addMessage)


export default router;