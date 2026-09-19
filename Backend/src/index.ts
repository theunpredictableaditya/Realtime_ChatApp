import dotenv from 'dotenv'
dotenv.config()
import http from "http"
import { Server } from 'socket.io'
import { app } from './app.js'
import { connectDB } from './db/dbConnection.js'

const server = http.createServer(app)

const port = process.env.PORT || 3000

const io = new Server(server)

io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id)

    socket.on("disconnect", () => {
        console.log("User Disconnected: ", socket.id)
    })
})

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
    .on('error', (error: unknown) => {
        console.log('Error in connecting to the database', error)
        process.exit(1)
    })
})
.catch((error: unknown) => {
    console.log('Error in starting the server', error)
    process.exit(1)
})