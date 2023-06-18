// require('dotenv').config()
// require('express-async-errors')
import dotenv from 'dotenv' 
dotenv.config()
import 'express-async-errors'

import express from 'express'
const app = express()

import morgan from 'morgan'
import cors from 'cors'
// const notFound = require('./middlewares/notfound')
import notFound from './middlewares/notfound.js'
const errorHandlerMiddleware = require('./middlewares/error-handler')

const authRouter = require('./routers/auth')
const mainRouter = require('./routers/main')

app.use(express.json())
app.use(morgan('common'))

// db
const connectDB = require('./db/connect')

app.use(cors({
    origin: '*',
}));

// routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/main', mainRouter)

// middlewares
app.use(notFound)
app.use(errorHandlerMiddleware)







const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`app is running on port ${port}`))


    } catch (error) {
        console.log(error)
    }
}

start()


