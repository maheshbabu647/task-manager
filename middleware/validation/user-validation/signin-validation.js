import {body, validationResult} from 'express-validator'

const userSignInValidators = [
    
    body('userEmail')
    .isEmail().withMessage('User email must be in correct foramt')
    .notEmpty().withMessage('User email must not be empty')
    .normalizeEmail()
    .trim(),

    body('userPassword')
    .notEmpty().withMessage("User password should not be empty")
    .isString().withMessage("User password must be a string")

]

const userSignInValidation = async (req, res, next) =>{

    const error = validationResult(req)

    if (!error.isEmpty()){

        const err = new Error()
        err.name = 'VALIDATION ERROR'   
        err.status = 400
        err.message = error.array()

        next(err)
    }

    next()
}

export {userSignInValidators, userSignInValidation}