import express from 'express'
import { getMe, login, logout, register } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route("/register").post(
    register
)

router.route("/login").post(
    login
)

router.route("/logout").post(
    logout
)

router.route("/getme").get(
    verifyJWT,
    getMe
) 

export default router