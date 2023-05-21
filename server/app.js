require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFound = require('./middlewares/notfound')
const errorHandlerMiddleware = require('./middlewares/error-handler')


// db
// middlewares
app.use(express.json())
app.use(notFound)
app.use(errorHandlerMiddleware)

// routers




const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`app is running on port ${port}`))