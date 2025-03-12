import { body, validationResult } from "express-validator";

const taskAddValidators = [

    body('taskTitle')
    .notEmpty().withMessage("Task title should not be empty")
    .isString().withMessage("Task title should only be string data")
    .isLength({min : 1, max : 100}).withMessage("Task title should contain minimum 1 character and maximum 100 characters"),

    body('taskDescription')
    .notEmpty().withMessage("Task description should not be empty")
    .isString().withMessage("Task description should be only of string")
    .isLength({min : 1, max : 1000}).withMessage("Task description should contain minimum 1 character and maximum 1000 characters")

]

const taskAddValidation = async (req, res, next) => {

    const error = validationResult(req)
     
    if(!error.isEmpty()){
        const err = new Error()
        err.status = 400
        err.name = 'VALIDATION_ERROR'
        err.message = error.array()

        next(err)
    }

    next()
}

export {taskAddValidators, taskAddValidation}