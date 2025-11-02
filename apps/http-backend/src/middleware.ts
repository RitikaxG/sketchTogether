import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./config";

export const authMiddleware = ( req: Request, res: Response, next : NextFunction ) => {
    try{
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if(!authHeader){
            return res.status(401).json({
                message : "Token not found"
            })
        }

        const token = authHeader.split(" ")[1] as string;
        console.log(token);
        const decoded = jwt.verify(token, JWT_TOKEN) as { userId : string };
        req.userId = decoded.userId;
        
        next();
    }
    catch(err){
        console.error("Authorization error",err);
        res.status(401).json({
            message : "Unauthorized",
        })
    }
    
}