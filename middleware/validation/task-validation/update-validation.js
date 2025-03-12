import { body, validationResult } from "express-validator";

const taskUpdateValidators = [

    body('taskTitle')
    .isString().withMessage("Task title should only be string data")
    .isLength({min : 1, max : 100}).withMessage("Task title should contain minimum 1 character and maximum 100 characters"),

    body('taskDescription')
    .isString().withMessage("Task description should be only of string")
    .isLength({min : 1, max : 1000}).withMessage("Task description should contain minimum 1 character and maximum 1000 characters"),

    body('taskLabel')
    .isString().withMessage("Task label should be only of string")
    .isLength({min : 1, max : 1000}).withMessage("Task label should contain minimum 1 character and maximum 1000 characters"),

    body('taskDescription')
    .isString().withMessage("Task description should be only of string")
    .isLength({min : 1, max : 1000}).withMessage("Task description should contain minimum 1 character and maximum 1000 characters"),

    body('taskDueDate')
    .isISO8601().withMessage("Task due date should be in the date format"),
    
    body('taskStatus')
    .isIn(['pending', 'inprogress', 'completed'])
    .withMessage("Task status should be any of the following ['pending', 'inprogress', 'completed']")

]

const taskUpdateValidation = async (req, res, next) => {

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

export {taskUpdateValidators, taskUpdateValidation}