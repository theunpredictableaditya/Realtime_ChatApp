import type { Request, Response} from 'express'
import type { AuthRequest } from '../types.js'

import { userModel } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { APIResponse } from '../utils/apiResponse.js';
import { APIError } from '../utils/apiError.js';

const register = asyncHandler(async(req: Request, res: Response): Promise<void> => {
    const {fullname, username, email, password} = req.body;

    if([fullname, username, email, password].some(cred => typeof cred !== "string" || cred.trim() === "")){
        throw new APIError(400, "All Credentials Are Required")
    }

    const noramlizedFullname = fullname.trim()
    const noramlizedUsername = username.trim().toLowerCase()
    const noramlizedEmail = email.trim().toLowerCase()

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if(!regex.test(noramlizedEmail)){
        throw new APIError(400, "Invalid Email Format!")
    }

    const doesUserAlreadyExists = await userModel.findOne({
        $or: [{
            username: noramlizedUsername
        }, {
            email: noramlizedEmail
        }]
    })

    if(doesUserAlreadyExists){
        throw new APIError(409, "Username or email already exists!")
    }

    const user = await userModel.create({
        fullname: noramlizedFullname,
        username: noramlizedUsername,
        email: noramlizedEmail,
        password
    })

    const { password: _, ...createdUser } = user.toObject();

    res
    .status(201)
    .json(new APIResponse(201, createdUser, "User Registered Successfully"))
})

const login = asyncHandler(async(req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    if([email, password].some(cred => typeof cred !== "string" || cred.trim() === "")){
        throw new APIError(400, "Missing Credentials! Can't LogIn.")
    }

    const noramlizedEmail = email.trim().toLowerCase()

    const user = await userModel.findOne({email: noramlizedEmail})

    if(!user){
        throw new APIError(401, "Invalid Credentials!")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect){
        throw new APIError(401, "Invalid Credentials!")
    }

    const accessToken = await user.generateAccessToken()

    const {password: _, ...loggedUser} = user.toObject()

    res
    .status(200)
    .cookie("accessToken", accessToken, {
        httpOnly: true,

    })
    .json(new APIResponse(200, loggedUser, "User LoggedIn SuccessFully!"))
})

const getMe = asyncHandler(async(req: AuthRequest, res: Response): Promise<void> => {
    const user = req.user

    if(!user){
        throw new APIError(401, "Authentication Required!")
    }

    const foundUser = await userModel.findById(user._id).select("-password")

    if(!foundUser){
        throw new APIError(401, "Invalid Authentication!")
    }

    res
    .status(200)
    .json(new APIResponse(200, foundUser, "User Details Retrieved Successfully!"))
})

const logout = asyncHandler(async(req:Request, res: Response): Promise<void> => {
    res
    .clearCookie("accessToken", {
        httpOnly: true
    })
    .status(200)
    .json(new APIResponse(200, {}, "Account LoggedOut Successfully"))
})


export {
    AuthRequest,
    register,
    login,
    getMe,
    logout
}