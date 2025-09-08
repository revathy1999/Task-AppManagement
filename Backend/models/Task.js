const mongoose=require("mongoose")
// define schema
const taskSchema=new mongoose.Schema({
    title:String,
    description:String,
    date:String,
    status:{
        type:String,
        enum:["To Do","In Progress","Completed", "In Complete"],
        default:"To Do"
    },
    pinned:{type:Boolean, default:false}
})

const tasks=mongoose.model('tasks', taskSchema)

module.exports=tasks;