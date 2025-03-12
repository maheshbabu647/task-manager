import taskModel from "../../model/task-model.js"

const taskDelete = async (req, res, next) => {

    try{

        const {taskId} = req.params

        const taskExisted = await taskModel.findOne({taskId})

        if(!taskExisted){

            const err = new Error()
            err.name = 'TASK_NOT_FOUND'
            err.message = 'unable to find the task with given id'
            err.status = 404

            throw err
        }

        const deletedTask = await taskModel.findOneAndDelete({taskId})

        res.status(200).json({success : true, data : {deletedTask}})

    }
    catch(error){

        const err = new Error()
        err.name = error.name || 'TASK_DELETE_FAILED'
        err.message = error.message || "Unable to delete the task"
        err.status = 500

        next(err)
    }
}

export default taskDelete