import jwt from 'jsonwebtoken'
import userSchema from '../model/user.js';
import mongoose from 'mongoose';

export default async function auth(req,res,next){

    try{

        let cookies = {};

        const User = mongoose.model('user',userSchema)
        const cookiesArray = req.headers.cookie.split(';');

        //loop through cookies
        cookiesArray.forEach((cookie) => {
            const [key, value] = cookie.trim().split('=');
            cookies[key] = value;
        });

        //verify token
        const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)

        //pass user
        const currUser = await User.findById(decoded.userid).exec()
        console.log(currUser._id.toString())
        req.user = currUser

        next()
    }
    catch(err){
        //TODO: Add some flag in the req for token expired, if yes, redirect to login page. 
        if (err instanceof jwt.TokenExpiredError) {
            // Token has expired
            console.error('Token expired:', err.message);
          } else if (err instanceof jwt.JsonWebTokenError) {
            // Other verification errors
            console.error('Token verification failed:', err.message);
          } else {
            // Other unexpected errors
            console.error('Error:', err.message);
          }
    }
}