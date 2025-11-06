import express from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./config.js";

import { withClerk } from "@repo/clerk-backend";
import { getAuth, requireAuth } from "@clerk/express";
import { prisma } from "@repo/db";

const app = express()
app.use(express.json()); // If not present, cannot destructure JSON data

withClerk(app);
app.get("/health",(req,res)=>{
    return res.status(200).json({
        "message": "ok"
    })
})


app.post("/create-room",requireAuth(), async (req,res) => {
    try{
        
        const  { userId }  = getAuth(req);
        console.log(userId);
        const { roomName } = req.body;
        if(!roomName){
            res.status(403).json({
                message: "Room name required"
            })
        }

        const newRoom = await prisma.room.create({
            data:{
                name : roomName
            }
        })

        res.status(200).json({
            newRoom,
            message : "Room created"
        })
    }
    catch(err){
        console.log("HTTP backend auth error",err);
        return res.status(500).json({
            message:"Unable to authenticate",
            error: err
        })
    }
  
})

app.listen(3001,()=>{
    console.log("Http backend is listening on port 3001")
})