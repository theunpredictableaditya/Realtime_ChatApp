import type { RequestHandler, Request, Response, NextFunction} from 'express'

function asyncHandler(fn: RequestHandler) {
    return function(req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    }
}

export {
    asyncHandler,
}