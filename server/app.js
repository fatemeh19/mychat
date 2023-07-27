import './utils/loadEnv.js'
import 'express-async-errors'

import express from 'express'
const app = express()

import http from 'http'
const server = http.createServer(app)

import socketConnection from './sockets/connection.js'

socketConnection(server)


import morgan from 'morgan'
import cors from 'cors'
import notFound from './middlewares/notfound.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'


import authRouter from './routers/auth.js'
import mainRouter from './routers/main.js'

app.use(express.json())
app.use(morgan('common'))

// db
import connectDB from './db/connect.js'

app.use(cors({
    origin: "http://localhost:3001",
    credentials:true
}))

// routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/main',mainRouter)

// middlewares
app.use(notFound)
app.use(errorHandlerMiddleware)

// 






const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        server.listen(port, () => console.log(`app is running on port ${port}`))

    } catch (error) {
        console.log(error)
    }
}

start()


