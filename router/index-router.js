import express from 'express'

import userRouter from './user-router.js'
import taskRouter from './task-router.js'

const indexRouter = express.Router()

indexRouter.use('/user', userRouter)
indexRouter.use('/task', taskRouter)

export default indexRouter