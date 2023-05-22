//imports and config
import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose"

//local imports
import connect from "./config/database.js"
import userSchema from "./model/user.js"
import auth from "./middleware/auth.js"

//setup
dotenv.config()
connect()

const app = express()

//middleware
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

//routes
app.post('/register', async (req,res)=>{

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
        httpOnly: true,
        maxAge : 2 * 60 * 60 * 1000
    })

    return res.json({
        message: "Successfully created a user",
        status: 200,
        token
    })

})

app.post('/login', async (req,res)=>{

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
            maxAge : 2 * 60 * 60 * 1000
        })
        return res.json({
            message: "Succesfully logged in",
            status: 200,
            token
        })
    }
    else{
        return res.json({
            message: "Invalid credentials",
            status: 400
        })
    }

})


app.get('/', auth, (req,res)=>{
    return res.json({
        message: "Hello World",
        status: 200
    })
})

//driver
app.listen(process.env.PORT,() => {
    setTimeout(()=>{console.log(mongoose.connection.readyState)},5000)
    console.log(`Authentication microservice running on http://localhost:${process.env.PORT}`);
})
