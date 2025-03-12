import { body, validationResult } from "express-validator";

const userUpdateValidators = [

    body('userId')
    .notEmpty().withMessage("userId is missing")
    .isString().withMessage("The user id is not a valid one"),

    body('userName')
    .optional()
    .isString().withMessage("The user name must be a string"),

    body('userPassword')
    .optional()
    .isString().withMessage('User password must a string')
    .notEmpty().withMessage('User Password should not be empty')
    .isLength({min : 8}).withMessage('User password must be minimum of 8 characters')
    .matches(/[A-Z]/).withMessage('User password must contain atleat one UpperCase')
    .matches(/[a-z]/).withMessage('User Password must contain atleast one LowerCase')
    .matches(/[0-9]/).withMessage('User password must contain atleast one numeric value')
    .matches(/[\W_]/).withMessage('User password must contain atleast one special symbol')

]

const userUpdateValidation = async (req, res, next) => {
    
    const error = validationResult(req)

    if (!error.isEmpty()){

        const err = new Error()
        err.status = 400
        err.name = 'INVALID DATA'
        err.message = error.array()

        next(err)
    }

    next()
}

export {userUpdateValidators, userUpdateValidation}