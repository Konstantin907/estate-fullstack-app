import bcrypt from "bcrypt"; 
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async(req, res)=>{
    const { username, email, password } = req.body;

    try {
        //hashing pass:
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating new user and save it to db:
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password: hashedPassword,
        }
    });

    console.log(newUser);
    res.status(201).json({message: 'User successfully created!'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to create user!'})
    }
    
}

export const login = async(req, res)=>{
    const { username, password } = req.body;
try {
    //if user exist or not:
    const user =await prisma.user.findUnique({
        where:{username}
    });
    if(!user){
        return res.status(401).json({message: 'Invalid credentials!'})
    }
    //check password:
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({message: 'Invalid credentials!'})
    }
    //generate token and send it to user:
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
        {
        id: user.id,
        isAdmin: false,
        },
     process.env.JWT_SECRET_KEY,
    {expiresIn: age});

    const {password:userPassword, ...userInfo} = user
   
    res.cookie("token", token, {
        httpOnly:true,
        //secure: true
        maxAge: age,
    }).status(200).json(userInfo)
} catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to login!' })
}
    
}


export const logout = (req, res)=>{
    res.clearCookie("token").status(200).json({
        message: "Logout successfull!"
    })
}