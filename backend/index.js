const express = require("express");
const connectDB = require("./config/db")
require("dotenv").config()

const app = express();

app.get("/",(req,res)=>{
    res.send("Server is working")
})

const PORT = process.env.PORT || 4000

// Connect to database and start server
connectDB()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is running on ${PORT}`)
        })
    })
    .catch((error)=>{
        console.error("Failed to start server:", error);
        process.exit(1);
    })