import taskModel from "../../model/task-model.js"

const taskUpdate = async (req, res, next) => {

    try{

        const {taskTitle, taskDescription, taskStatus, taskLabel, taskDueDate} = req.body
        const {taskId} = req.params
    

        const taskExisted = await taskModel.findOne({taskId})

        if (!taskExisted) {

            const err = new Error()
            err.name = "TASK_UPDATE_FAILED",
            err.message = "The task is not found to make update",
            err.status = 404

            throw err
        }

        const dataToUpdate = {
            taskTitle : taskTitle || taskExisted.taskTitle,
            taskDescription : taskDescription || taskExisted.taskDescription,
            taskStatus : taskStatus || taskExisted.taskStatus,
            taskLabel : taskLabel || taskExisted.taskLabel,
            taskDueDate : taskDueDate || taskExisted.taskDueDate
        }

        const updatedData = await taskModel.findOneAndUpdate({taskId}, dataToUpdate, {new : true})

        res.status(201).json({succes : true, data : updatedData})

    }
    catch(error){
        
        const err = new Error()
        err.name = error.name || 'TASK_UPDATE_FAILED'
        err.message = error.message || 'Unable to update the task'
        err.status = error.status || 409

        next(err)

    }
}

export default taskUpdate