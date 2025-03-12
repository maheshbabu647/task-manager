import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
        unique : true,
        default : () => crypto.randomUUID()
    },
    userName : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true,
        unique : true
    },
    userPassword : {
        type : String,
        required : true,
    },
    verified : {
        type : Boolean,
        default : false,
        enum : [true, false]
    }
}, {timestamps : true} )


const userModel = mongoose.model('User', userSchema)

export default userModel