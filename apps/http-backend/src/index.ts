import express from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./config";
import { authMiddleware } from "./middleware";

const app = express()
app.use(express.json()); // If not present, cannot destructure JSON data

app.use("/health",(req,res)=>{
    return res.status(200).json({
        "message": "ok"
    })
})

app.use("/signup",(req,res) => {
    const { username, password } = req.body;
    if(!username || !password){
        res.status(403).send("Username and password required")
    }

    res.status(200).json({
        message: "Successfully signed up"
    })

})

app.use("/signin",(req,res) => {
    const { username, password } = req.body;
    if(!username || !password){
        res.status(403).json({
            message: "Username and password required"
        })
    }

    const userId = 1;
    const token = jwt.sign({
        userId
    },JWT_TOKEN);

    res.status(200).json({
        message : "Sucessfully signed in",
        token
    })
})

app.use("/create-room",authMiddleware,(req,res) => {
    const { roomName } = req.body;
    if(!roomName){
        res.status(403).json({
            message: "Room name required"
        })
    }

    res.status(200).json({
        message : "Room created"
    })
})

app.listen(3001,()=>{
    console.log("Http backend is listening on port 3001")
})