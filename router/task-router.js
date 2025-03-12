import express from 'express'

import taskAdd from '../controller/task-controller/task-add.js'
import taskUpdate from '../controller/task-controller/task-update.js'
import taskDelete from '../controller/task-controller/task-delete.js'
import taskGetAll from '../controller/task-controller/task-get-all.js'

import userAuthorization from '../middleware/user-authorization.js'
import { taskAddValidation, taskAddValidators } from '../middleware/validation/task-validation/add-validation.js'
import { taskUpdateValidators, taskUpdateValidation } from '../middleware/validation/task-validation/update-validation.js'

const taskRouter = express.Router()

taskRouter.route('/add').post(userAuthorization, taskAddValidators, taskAddValidation, taskAdd)
taskRouter.route('/update/:taskId').patch(userAuthorization, taskUpdateValidators, taskUpdateValidation, taskUpdate)
taskRouter.route('/delete/:taskId').delete(userAuthorization, taskDelete)
taskRouter.route('/getAll').get(userAuthorization,  taskGetAll)

export default taskRouter