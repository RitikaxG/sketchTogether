import "express"
// This will automatically extend the global request type

declare global {
    namespace Express {
        interface Request {
            userId? : string
        }
    }
}