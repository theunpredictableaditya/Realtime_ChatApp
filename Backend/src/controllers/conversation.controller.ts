import { Response } from "express";
import { AuthRequest } from "../types.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { APIResponse } from "../utils/apiResponse.js";

import { conversationModel } from "../models/conversation.model.js";

const getConversations = asyncHandler(async(req: AuthRequest, res: Response): Promise<void> => {
    const user = req.user

    if(!user){
        throw new APIError(401, "Authentication Required!")
    }

    const userId = user._id

    const conversations = await conversationModel.find({
        participants: userId
    })
    .populate(
        "participants",
        "fullname username"
    )

    res
    .status(200)
    .json(
        new APIResponse(200, conversations, "Conversations Returned Successfully!")
    )
})

export {
    getConversations
}