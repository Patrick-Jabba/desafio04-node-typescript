import { Router } from 'express'
import { LoginController } from './controllers/LoginController'
import {UserController} from './controllers/UserController'
import { verifyAuth } from './middleware/verifyAuth'

export const router = Router()

const userController = new UserController()
const loginController = new LoginController()

router.get('/user/:userId', verifyAuth, userController.getUserById)
router.post('/user', userController.createUser)
router.delete(`/user/:id`, userController.deleteUser)


router.post('/login', loginController.login)
