import { userModel } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { APIResponse } from '../utils/apiResponse.js';
import { APIError } from '../utils/apiError.js';

const register = asyncHandler(async(req, res) => {
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
            username
        }, {
            email
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

    const createdUser = user.toObject();
    delete createdUser.password

    res
    .status(201)
    .json(new APIResponse(201, createdUser, "User Registered Successfully"))
})

const login = asyncHandler(async(req, res) => {
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

    const loggedUser = user.toObject()
    delete loggedUser.password

    res
    .status(200)
    .cookie("accessToken", accessToken, {
        httpOnly: true,

    })
    .json(new APIResponse(200, loggedUser, "User LoggedIn SuccessFully!"))
})

const getMe = asyncHandler(async(req, res) => {
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

const logout = asyncHandler(async(req, res) => {
    res
    .clearCookie("accessToken", {
        httpOnly: true
    })
    .status(200)
    .json(new APIResponse(200, {}, "Account LoggedOut Successfully"))
})


export {
    register,
    login,
    getMe,
    logout
}