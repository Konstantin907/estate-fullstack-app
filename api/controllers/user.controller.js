import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'

export const getUsers = async(req, res) =>{
    
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({messsage: 'Failed to get users!'})
    }
};

//single:
export const getUser = async(req, res) =>{
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({messsage: 'Failed to get users!'})
    }
}
//updating:

export const updateUser = async(req, res) =>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs} = req.body;

    if(id !== tokenUserId){
      return res.status(403).json({message: 'Not Authorized!'})
    }
    let updatedPassword = null;   
     try {

        if(password){
            updatedPassword = await bcrypt.hash(password,10)
        }
        
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(avatar && {avatar}),
                ...(updatedPassword && {password: updatedPassword})
            }
        })
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({messsage: 'Failed to get users!'})
    }
}

//deleting:
export const deleteUser = async(req, res) =>{
    const id = req.params.id;
    const tokenUserId = req.userId;

    if(id !== tokenUserId){
        return res.status(404).json({message: 'Not Autorized!'});
    }

    try {
         await prisma.user.delete({
            where: {id}
        });
        res.status(200).json({message: 'User deleted successfully!'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({messsage: 'Failed to get users!'})
    }
}