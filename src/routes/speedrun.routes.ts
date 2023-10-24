import { Router } from "express"
import CheckToken from "../middlewares/CheckToken.middleware"
import { SpeedRunController } from "../controller/SpeedRunController"
import { SpeedRunRepositoryMongoose } from "../repositories/SpeedRunRepositoryMongoose"
import { SpeedRunCases } from "../UseCase/SpeedRunUseCases"
import { UserRepositoryMongoose } from "../repositories/UserRepositoryMongoose"

class SpeedRunRoutes {
	public router: Router
  private speedRunController: SpeedRunController
  constructor() {
    this.router = Router()
		const userRepository = new UserRepositoryMongoose()
    const speedRunRepository = new SpeedRunRepositoryMongoose()
    const speedRunUseCases = new SpeedRunCases(speedRunRepository, userRepository)
    this.speedRunController = new SpeedRunController(speedRunUseCases)
    this.initRoutes()
  }

	initRoutes() {
		this.router.post(
			'/speedrun/register',
			this.speedRunController.registerSpeedRun.bind(this.speedRunController)
		)
		this.router.get(
			'/speedrun',
			this.speedRunController.findAllRuns.bind(this.speedRunController)
		)
		this.router.delete(
			'/speedrun/:id',
			CheckToken,
			this.speedRunController.deleteSpeedRun.bind(this.speedRunController)
		)
		this.router.get(
			'/speedrun/:id',
			this.speedRunController.findSpeedRunById.bind(this.speedRunController)
		)
	}
}

export { SpeedRunRoutes }
