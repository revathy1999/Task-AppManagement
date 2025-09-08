const express=require("express")
const cors=require("cors")
const connectDB = require("./config/db")
const app=express()
app.use(cors())
app.use(express.json());

// database connection
connectDB();

// import routes
const taskroutes=require("./routes/taskroutes")
app.use("/tasks",taskroutes)

app.listen(5000, function(req,res){
    console.log("Server Started..");
    
})