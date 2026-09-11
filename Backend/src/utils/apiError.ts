class APIError extends Error {
    public statusCode: number;
    public message: string;
    public errors: unknown[];
    public success: boolean;
    public data: unknown;
    constructor(statusCode: number, message: string = 'Internal Server Error', errors: unknown[] = [], stack: string = '') {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.message = message;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {
    APIError,
}