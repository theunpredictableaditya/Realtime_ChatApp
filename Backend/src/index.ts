import dotenv from 'dotenv'
dotenv.config()
import { app } from './app.js'
import { connectDB } from './db/dbConnection.js'

const port = process.env.PORT || 3000

connectDB().then(() => {
    app.listen(port, () => {
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