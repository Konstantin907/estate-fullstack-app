import express from 'express'
import { deleteUser, getUser, getUsers, profilePosts, savePost, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

//GET ALL USERS:
router.get('/', getUsers);
//Get Single:
router.get('/search/:id',verifyToken ,getUser);
//Update User: for client side:
router.put('/:id',verifyToken ,updateUser);
//DELETE USER:
router.delete('/:id',verifyToken ,deleteUser);
//Saving posts:
router.post("/save", verifyToken, savePost);
//fetch all saved:
router.get("/profilePosts", verifyToken, profilePosts);


export default router