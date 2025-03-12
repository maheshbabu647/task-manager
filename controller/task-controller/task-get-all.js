import taskModel from "../../model/task-model.js"

const taskGetAll = async(req, res) => {

    try{

        const {userId} = req.body

        const allTasks = await taskModel.find({userId})

        res.status(200).json({success : true, data : allTasks})

    }
    catch(error){
        
        const err = new Error()
        err.name = error.name || 'TASK_GET_ALL_FAILED'
        err.message = error.message || "Unable to get all the tasks"
        err.status = error.status || 500

        next(err)
    }
}

export default taskGetAll