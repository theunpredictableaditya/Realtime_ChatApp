import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { getConversations } from '../controllers/conversation.controller.js'

const router = Router()

router.route("/get-conversations").get(
    verifyJWT,
    getConversations
)

export default router