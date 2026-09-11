import { userModel } from "../models/user.model.js";
import { APIError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const cookie = req.cookies?.accessToken

        if(!cookie) {
            throw new APIError(400, "Unable To Verify User")
        }
        
        const decodedToken = jwt.verify(cookie, process.env.TOKEN_SECRET)
        
        const user = await userModel.findById(decodedToken?._id).select("-password")
        
        if(!user){
            throw new APIError(400, "Unable To Validate The Token")
        }
        req.user = user
        
        next()
    } catch (error) {
        throw new APIError(400, "Unexpected Error Occured")
    }
})

export {
    verifyJWT
}