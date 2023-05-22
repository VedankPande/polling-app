import auth from "../middleware/auth.js";

const setupAuth = (app,ROUTES) =>{
    console.log("in auth")
    ROUTES.forEach(route=>{
        if (route.auth){
            app.use(route.url,auth)
        }
    })
}


export default setupAuth