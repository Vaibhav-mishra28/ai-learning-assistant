const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db")
const errorHandler = require('./middleware/errorHandler.middleware');

//Route imports
const contentRoutes = require('./routes/content.routes');
const quizRoutes = require('./routes/quiz.routes');
const progressRoutes = require('./routes/progress.routes');

require("dotenv").config()

const app = express();

//Middleware
app.use(cors()); // enable CORS for frontend
app.use(express.json());//parse json bodies
app.use(express.urlencoded({extended: true})); //parse URL-encoded bodies


app.get("/",(req,res)=>{
    res.send("Server is working")
})

//API routes
app.use('/api/content', contentRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);

//404 handler for undefined routes 
app.use((req,res)=>{
    res.status(404).json({
        error:'Route not found'
    });
});

//Error handler middleware (must be last)
app.use(errorHandler);


const PORT = process.env.PORT || 4000

// Connect to database and start server
connectDB()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`✅ Server is running on ${PORT}`)
        })
    })
    .catch((error)=>{
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    })