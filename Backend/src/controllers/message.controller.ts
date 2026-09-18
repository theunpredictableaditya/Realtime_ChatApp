import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";

import { conversationModel } from "../models/conversation.model.js";
import { messageModel, MessageDocument } from "../models/message.model.js";

import type { AuthRequest, MessageType } from "../types.js";
import { Types } from "mongoose";
import type { QueryFilter } from "mongoose";
import { Response } from "express";
import { APIResponse } from "../utils/apiResponse.js";
import { userModel } from "../models/user.model.js";


const MessageCreateFunction = async(conversationId: Types.ObjectId, senderId: Types.ObjectId, content: string, messageType: MessageType = 'text'): Promise<MessageDocument> => {
    const createMessage = await messageModel.create({
        conversation: conversationId,
        sender: senderId,
        content: content,
        messageType
    })

    if(!createMessage){
        throw new APIError(500, "Message Can't Be Delivered!")
    }

    return createMessage
}

const sendMessage = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const sender = req.user

    if(!sender){
        throw new APIError(401, "Authentication Required!")
    }

    const {receiverId, content}: {receiverId: string, content: string} = req.body;

    if(!receiverId || !content?.trim()){
        throw new APIError(400, "Receiver and message content are required!");
    }

    if(!Types.ObjectId.isValid(receiverId)){
        throw new APIError(400, "Invalid Receiver Id");
    }

    const senderId = sender._id
    const receiverObjectId = new Types.ObjectId(receiverId)
    
    if(senderId.toString() === receiverId){
        throw new APIError(400, "You Cannot Mesasge Yourself!");
    }

    const receiver = await userModel.findById(receiverObjectId);

    if(!receiver){
        throw new APIError(404, "Receiver Not Found!");
    }

    let conversation = await conversationModel.findOne({
        type: "direct",
        participants: {
            $all: [senderId, receiverObjectId],
            $size: 2
        }
    })

    if(!conversation){
        conversation = await conversationModel.create({
            type: 'direct',
            participants: [senderId, receiverObjectId],
        })
    }

    const message = await MessageCreateFunction(conversation._id, senderId, content.trim())

    res
    .status(201)
    .json(new APIResponse(201, message, "Message Delivered Successfully!"))
})

const getMessages = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const user = req.user

    if(!user) {
        throw new APIError(401, "Authentication Required!")
    }

    const { conversationId } = req.params as {
        conversationId: string
    }

    if(!conversationId){
        throw new APIError(400, "Conversation Id Is Required!")
    }

    if(!Types.ObjectId.isValid(conversationId)){
        throw new APIError(400, "Invalid Conversation Id!")
    }

    const conversation = await conversationModel.findOne({
        _id: conversationId,
        participants: user._id
    })

    if(!conversation){
        throw new APIError(404, "Conversation Not Found!")
    }

    const limit = Math.min( Number(req.query.limit)  || 50, 100);

    const before = req.query.before as string | undefined;

    const query: QueryFilter<MessageDocument> = {
        conversation: conversation._id
    }

    if(before){
        if(!Types.ObjectId.isValid(before)){
            throw new APIError(400, "Invalid Cursor!")
        }

        query._id = {
            $lt: new Types.ObjectId(before)
        }
    }

    const messages = await messageModel
    .find(query)
    .sort({_id: -1})
    .limit(limit + 1)

    const hasMore = messages.length > limit

    if(hasMore){
        messages.pop()
    }

    messages.reverse()

    const nextCursor = hasMore ? messages[0]?._id : null

    res
    .status(200)
    .json(
        new APIResponse(200, {
            messages,
            nextCursor,
            hasMore
        },
        "Message Fetched Successfully!"
    )
    )
})

export {
    sendMessage,
    getMessages
}