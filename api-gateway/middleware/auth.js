import jwt from 'jsonwebtoken'

export default async function auth(req,res,next){

    try{

        let cookies = {};
        
        if (!req.headers.cookie){
          throw new Error("Token not in headers")
        }
        const cookiesArray = req.headers.cookie.split(';');

        //loop through cookies
        cookiesArray.forEach((cookie) => {
            const [key, value] = cookie.trim().split('=');
            cookies[key] = value;
        });

        //verify token
        const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)
        console.log(decoded)
        
        next()
    }
    catch(err){
        //TODO: Add some flag in the req for token expired, if yes, redirect to login page. 
        if (err instanceof jwt.TokenExpiredError) {

            // Token has expired
            console.error('Token expired:', err.message);
            res.json({"status":401,"message": err.message})
          } else if (err instanceof jwt.JsonWebTokenError) {
            // Other verification errors
            console.error('Token verification failed:', err.message);
            res.json({"status":401,"message":err.message})
          } else {
            // Other unexpected errors
            console.error('Error:', err.message);
            res.json({"status":500,"message": err.message})
          }
    }
}