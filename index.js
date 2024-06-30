const express = require('express')
const app = express()

require("dotenv").config()
app.use(express.json())

const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

PORT = process.env.PORT || 4000

const Router = require('./router/fileroute')
app.use("/api/v1/upload",Router);

require('./config/database').connect()
require('./config/cloudinary').connect()




app.listen(PORT,() => {
    console.log(`App is lisening in port no. ${PORT}`)
})