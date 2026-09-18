import { Router} from 'express'
import { sendMessage, getMessages } from '../controllers/message.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/send-message").post(
    verifyJWT,
    sendMessage
)

router.route("/:conversationId/get-messages").get(
    verifyJWT,
    getMessages
)


export default router