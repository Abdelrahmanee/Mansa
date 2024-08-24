import { Router } from "express"
import authRouter from '../modules/auth/routers/auth.routes.js'
import userRouter from '../modules/user/routers/user.routes.js'
const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)


export default router