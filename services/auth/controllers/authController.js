import mongoose, { mongo } from "mongoose"; 
import jwt from "jsonwebtoken"

import userSchema from "../model/user.js";

//TODO: Blacklist TRACE requests for all requests to prevent anyone reading httponly cookies
const login = async (req,res)=>{
    const User = mongoose.model('user',userSchema)
    const {email,password} = req.body

    //check body
    if(!(email&&password)){
        return res.json({
            message: "Both fields are required",
            status: 400})
    }

    const user = await User.findOne({email})

    if (user && user.validatePassword(password)){
        
        const token = jwt.sign({userid: user._id},
                      process.env.JWT_SECRET,
                      {expiresIn: process.env.JWT_EXPIRE_TIME})
        
        res.cookie('token',token,{
            secure: !(process.env.NODE_ENV === 'DEV'),
            httpOnly: true,
            sameSite: 'none',
            maxAge : 2 * 60 * 60 * 1000
        })
        return res.json({
            message: "Succesfully logged in",
            status: 200,
            payload: {user:user._id}
        })
    }
    else{
        return res.json({
            message: "Invalid credentials",
            status: 400
        })
    }
}

const register = async (req,res)=>{

    const {email,password} = req.body
    const User = mongoose.model('user',userSchema)

    //check if fields are present 
    if(!(email && password)){
        return res.json({
            message: "Both password and username are required",
            status: 400})
    }

    //check if user already exists.
    //TODO: add a method in user schema for this so you dont have to hash here
    if(await User.findOne({email})){
        return res.json({
            message: "User already exists, please login if this is you",
            status:400})
    }

    const newUser = new User({email: email, password: password})

    try{
        newUser.save()
        console.log("created new user")
    }
    catch(err){
        return res.json({
            message: err.message,
            status:500})
    }

    //TODO: Return JWT
    const token = jwt.sign({userid: newUser._id},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_TIME})
    
    res.cookie('token',token,{
        secure: !(process.env.NODE_ENV === 'DEV'),
        sameSite: 'none',
        httpOnly: true,
        maxAge : 2 * 60 * 60 * 1000
    })

    return res.json({
        message: "Successfully created a user",
        status: 200,
        payload: {user:newUser._id}
    })

}

export { login,register }