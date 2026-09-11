import type { UserDocument } from '../types.js'

import mongoose, {Schema, Document, Types} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const userSchema = new Schema<UserDocument>({
    fullname: {
        type: String,
        required: [true, "FullName Is Required"],
        trim: true
    },
    username: {
        type: String,
        lowercase: true,
        required: [true, "Username Is Required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true,"Email Is required"]
    },
    password: {
        type: String,
        required: [true, "Password Is  Required"]
    }
})

userSchema.pre('save', async function() {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
})

userSchema.methods.generateAccessToken = function() {
    const secret = process.env.TOKEN_SECRET;
    const expiry = process.env.TOKEN_EXPIRY_TIME;

    if (!secret) {
        throw new Error("TOKEN_SECRET is not defined");
    }
    if (!expiry) {
        throw new Error("TOKEN_EXPIRY_TIME is not defined");
    }

    return jwt.sign({
        _id: this._id.toString(),
        email: this.email
    },
    secret as string,
    {
        expiresIn: expiry as any
    }
)
}

userSchema.methods.isPasswordCorrect = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export const userModel = mongoose.model('USER', userSchema)