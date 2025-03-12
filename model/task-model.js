import mongoose, { Mongoose } from 'mongoose'
import crypto from 'crypto'

const taskSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    taskId : {
        type : String,
        required : true,
        unique : true,
        default : () => crypto.randomUUID()
    },
    taskTitle : {
            type : String,
            required : true
    },
    taskDescription :{
        type : String,
        required : true
    },
    taskStatus : {
        type : String,
        enum : ['completed', 'inprogess', 'pending'],
        default : 'pending'
    },
    taskLabel : {
        type : String
    },
    taskDueDate : {
        type : Date
    }
}, {timeStamp : true})

const taskModel = mongoose.model('Task', taskSchema)

export default taskModel
