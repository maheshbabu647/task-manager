import taskModel from "../../model/task-model.js"


const taskAdd = async(req, res, next) => {

    try{

        const {userId, taskTitle, taskDescription, taskLabel, taskDueDate} = req.body

        const dataToAdd = {
            userId,
            taskTitle,
            taskDescription,
            taskLabel : taskLabel || undefined,
            taskDueDate : new Date(taskDueDate) || undefined
        }

        const addedTask = await taskModel.create(dataToAdd)

        res.status(201).json({success : true, data : addedTask})
    }
    catch(error){
        
        const err = new Error()
        err.name = error.name || "TASK_CREATION_FAILED"
        err.message = error.message || "Unable to create the task."
        err.status = error.status || 400

        next(err)
    }
}

export default taskAdd