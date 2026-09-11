import type { Request, Response, NextFunction} from 'express'
import type { DecodedToken } from '../types.js';

import { userModel } from "../models/user.model.js";
import { APIError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const cookie = req.cookies?.accessToken

        if(!cookie) {
            throw new APIError(400, "Unable To Verify User")
        }

        if(!process.env.TOKEN_SECRET){
            throw new Error("TOKEN SECRET IS NOT DEFINED IN ENVIRONMENT VARIABLE")
        }
        
        const decodedToken = jwt.verify(cookie, process.env.TOKEN_SECRET) as DecodedToken
        
        const user = await userModel.findById(decodedToken._id).select("-password")
        
        if(!user){
            throw new APIError(400, "Unable To Validate The Token")
        }

        (req as any).user = user
        
        next()
    } catch (error) {
        throw new APIError(400, "Unexpected Error Occured")
    }
})

export {
    verifyJWT
}