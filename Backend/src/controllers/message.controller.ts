import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";

import { conversationModel } from "../models/conversation.model.js";
import { messageModel, MessageDocument } from "../models/message.model.js";

import type { AuthRequest } from "../types.js";
import { Types } from "mongoose";
import { Response } from "express";
import { APIResponse } from "../utils/apiResponse.js";
import { userModel } from "../models/user.model.js";

type MessageType = 'text' | 'image' | 'video' | 'file'

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

export {
    sendMessage
}