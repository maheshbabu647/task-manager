import bcrypt from 'bcrypt'

import userModel from '../../model/user-model.js'
import sendVerificationMail from '../../service/email-verfication-service.js'
import { createAuthCookie} from '../../util/auth-cookie.js'

const userSignUp = async (req, res, next) => {
    try{

        const {userName, userEmail, userPassword} = req.body

        const userExisted = await userModel.findOne({userEmail})

        if (userExisted){

         const err = new Error()
         err.name = 'USER ALREADY EXISTED'
         err.message = 'user already with the given email'
         err.status = 409

         throw err
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const userData = {userName, userEmail, userPassword : hashedPassword}

        const createdData = await userModel.create(userData)
        createdData.userPassword = "************"

        await sendVerificationMail(createdData.userId, userName, userEmail)
        await createAuthCookie(res, createdData.userId)

        res.status(201).json({success : true, data :createdData})
    }
    catch(error){
   
        const err = new Error()
        err.name = error.name
        err.message = error.message
        err.status = error.status

        next(err)
    }
}

export default userSignUp