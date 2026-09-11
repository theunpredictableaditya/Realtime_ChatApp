import type {Request, Response, NextFunction} from 'express'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { APIError } from "./utils/apiError.js"

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
import userRouter from "./routes/auth.route.js"

app.use("/api/v1", userRouter)

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof APIError){
        const statusCode = err.statusCode || 500
        
        res.status(statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error',
        })
    }

    res
    .status(500)
    .json({
        success: false,
        message: "Internal Server Error"
    })
})

export { app }