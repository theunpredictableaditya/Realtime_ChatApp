import type { Request } from "express"
import { JwtPayload } from "jsonwebtoken"
import { Document, Types } from "mongoose"

interface AuthRequest extends Request {
    user? : {
        _id: Types.ObjectId;
        [key: string]: any;
    }
}

interface DecodedToken extends JwtPayload {
    _id: string;
    email?: string;
}

interface UserDocument extends Document {
    _id: Types.ObjectId;
    fullname: string;
    username: string;
    email: string;
    password: string;
    generateAccessToken: () => string;
    isPasswordCorrect: (password: string) => Promise<boolean>;
}

type MessageType = 'text' | 'image' | 'video' | 'file'

export {
    AuthRequest,
    DecodedToken,
    UserDocument,
    MessageType
}