const rootRouter = require("express").Router()

rootRouter.get("/",(req,res,next) => {
    res.send("hey, Don't worry I am working")
})




module.exports = rootRouter


