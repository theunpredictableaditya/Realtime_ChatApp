import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
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
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.TOKEN_SECRET,
    {
        expiresIn: process.env.TOKEN_EXPIRY_TIME
    }
)
}

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export const userModel = mongoose.model('USER', userSchema)