import bcrypt from 'bcrypt'

import userModel from "../../model/user-model.js"

const userUpdate = async (req, res, next) => {

    try{

        const {userId, userName, userPassword} = req.body

        const userExisted = await userModel.findOne({userId})

        if (!userExisted){
            const err = new Error()
            err.name = "USER NOT FOUND"
            err.message = `Unable to find the user`
            err.status = 404

            throw err
        }

        const newData = {
            userName : userName || userExisted.userName,
            userPassword : userPassword ? await bcrypt.hash(userPassword, 10) : userExisted.userPassword
        }

        const upadatedData = await userModel.findOneAndUpdate({userId}, {$set : newData}, {new : true})
        upadatedData.userPassword = "***********"

        res.status(200).json({success : true, data : upadatedData})
    }
    catch(error){

        const err = new Error()
        err.name = error.name || 'USER UPDATE FAILED'
        err.message = error.message || "Unable to update the user"
        err.status = 409

        next(err)
    }
}

export default userUpdate