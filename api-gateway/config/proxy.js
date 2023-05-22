import { createProxyMiddleware } from "http-proxy-middleware";

const setupProxy = (app,ROUTES) =>{

    ROUTES.forEach(route=>{
        app.use(route.url, createProxyMiddleware(route.proxy))
    })
}


export default setupProxy
