import { Router } from "express"
import { UserController } from "../controller/UserController"
import { UserRepositoryMongoose } from "../repositories/UserRepositoryMongoose"
import { UserUseCases } from "../UseCase/UserUseCases"
import CheckToken from "../middlewares/CheckToken.middleware"

class UserRoutes {
	public router: Router
  private userController: UserController
  constructor() {
    this.router = Router()
    const userRepository = new UserRepositoryMongoose()
    const userUseCases = new UserUseCases(userRepository)
    this.userController = new UserController(userUseCases)
    this.initRoutes()
  }

	initRoutes() {
		this.router.post(
			'/register',
			this.userController.createUser.bind(this.userController)
		)
		this.router.post(
      '/login',
      this.userController.login.bind(this.userController)
    )
		this.router.get(
			'/users/:username',
			this.userController.findUser.bind(this.userController)
		)
		this.router.patch(
			'/profile',
			CheckToken,
			this.userController.updateUser.bind(this.userController)
		)
		this.router.delete(
			'/profile',
			CheckToken,
			this.userController.updateUser.bind(this.userController)
		)
		this.router.patch(
			'/profile/password',
			CheckToken,
			this.userController.updatePassword.bind(this.userController)
		)
		this.router.post(
			'/profile/message',
			CheckToken,
			this.userController.sendMessage.bind(this.userController)
		)
		this.router.patch(
			'/profile/message',
			CheckToken,
			this.userController.editMessage.bind(this.userController)
		)
		this.router.get(
			'/profile/message',
			this.userController.findAllMessages.bind(this.userController)
		)
	}
}

export { UserRoutes }
