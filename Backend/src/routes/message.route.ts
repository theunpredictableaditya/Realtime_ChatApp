import { Router} from 'express'
import { sendMessage } from '../controllers/message.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/send-message").post(
    verifyJWT,
    sendMessage
)


export default router