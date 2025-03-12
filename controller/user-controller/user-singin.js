import bycrpt from 'bcrypt'

import userModel from "../../model/user-model.js"
import { createToken } from '../../util/jwt.js'
import { createAuthCookie } from '../../util/auth-cookie.js'


const userSignIn = async (req, res, next) => {
    try{

        const {userEmail, userPassword} = req.body

        const userExisted = await userModel.findOne({userEmail})

        if (!userExisted){
            const err = new Error()
            err.name = 'USER NOT FOUND'
            err.message = `Unable to find the user ${userEmail}`
            err.status = 404

            throw err
        }

        const userVerified = await bycrpt.compare(userPassword, userExisted.userPassword)

        if (!userVerified){
            const err = new Error()
            err.name = 'INCORRECT PASSWORD'
            err.message = 'The password entered is not valid'
            err.status = 401

            throw err
        }

        const authToken = await createToken({userId : userExisted.userId})
        await createAuthCookie(res, authToken)

        userExisted.userPassword = '*************'

        res.status(200).json({success : true, data : userExisted})
    }
    catch(error){
        const err = new Error()
        err.name = error.name || "USER SIGNIN FAILED"
        err.message = error.message
        err.status = error.status || null

        next(err)
    }
}


export default userSignIn