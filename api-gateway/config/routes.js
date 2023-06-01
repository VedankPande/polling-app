//TODO: use YAML File or something else instead - change name 

const ROUTES = [
    {
        url: '/polls',
        auth: true,
        creditCheck: false,
        // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 5
        // },
        proxy: {
            target: "http://localhost:3050",
            changeOrigin: true
        }
    },
    {
        url: '/votes',
        auth: true,
        creditCheck: false,
        // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 5
        // },
        proxy: {
            target: "http://localhost:3040",
            changeOrigin: true
        }
    }
]

export {ROUTES}