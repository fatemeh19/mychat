require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')

const notFound = require('./middlewares/notfound')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const authRouter = require('./routers/auth')
app.use(express.json())
app.use(morgan('common'))
// db
const connectDB = require('./db/connect')


// routers
app.use('/api/v1/auth', authRouter)

// middlewares
app.use(notFound)
app.use(errorHandlerMiddleware)







const port = process.env.PORT || 5000

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=> console.log(`app is running on port ${port}`))

        
    } catch (error) {
        console.log(error)
    }
}

start()


