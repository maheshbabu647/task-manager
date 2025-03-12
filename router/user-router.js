import express from 'express'

import userSignUp from '../controller/user-controller/user-signup.js'
import userSignIn from '../controller/user-controller/user-singin.js'
import userUpdate from '../controller/user-controller/user-update.js'
import verifyUser from '../controller/user-controller/user-verification.js'

import { userSignUpValidators, userSignUpVaidation } from '../middleware/validation/user-validation/signup-validation.js'
import { userSignInValidators, userSignInValidation } from '../middleware/validation/user-validation/signin-validation.js'
import { userUpdateValidators, userUpdateValidation } from '../middleware/validation/user-validation/update-validation.js'

import userAuthorization from '../middleware/user-authorization.js'

const userRouter = express.Router()

userRouter.route('/signup').post(userSignUpValidators, userSignUpVaidation, userSignUp)
userRouter.route('/signin').post(userSignInValidators, userSignInValidation, userSignIn)
userRouter.route('/update').patch(userAuthorization, userUpdateValidators, userUpdateValidation, userUpdate)
userRouter.route('/verify/:verificationToken').get(verifyUser)

export default userRouter