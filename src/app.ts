import express, { Application } from 'express'
import { errorMiddleware } from './middlewares/error.middleware'
import { connect } from './infra/db'
import cors from 'cors'
import 'path'
import { UserRoutes } from './routes/user.routes'
import { SpeedRunRoutes } from './routes/speedrun.routes'

class App {
	public app: Application
	private userRoutes = new UserRoutes()
	private runsRoutes = new SpeedRunRoutes()
	constructor() {
		this.app = express()
		this.middlewaresInitialize()
		this.interceptionError()
		this.initializeRoutes()
		connect()
	}

	private initializeRoutes() {
		this.app.use('/api/users', this.userRoutes.router)
		this.app.use('/api/runs', this.runsRoutes.router)
	}

	private interceptionError() {
		this.app.use(errorMiddleware)
	}

	private middlewaresInitialize() {
		this.app.use(express.json())
		this.app.use(cors())
		this.app.use(express.urlencoded({ extended: true }))
	}

	listen() {
		this.app.listen(process.env.PORT || 3000, () => {
			console.log(`Server is running on port ${process.env.PORT || 3000}`)
		})
	}
}

export { App }
