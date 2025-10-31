import express from "express";

const app = express()

app.use("/",(req,res)=>{
    return res.json({
        "message": "hello"
    })
})

app.listen(3001,()=>{
    console.log("Http backend is listening on port 3001")
})