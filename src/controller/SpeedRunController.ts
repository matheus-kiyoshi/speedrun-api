import { NextFunction, Request, Response } from "express"
import { SpeedRunCases } from "../UseCase/SpeedRunUseCases"

class SpeedRunController {
	constructor(private speedRunUseCase: SpeedRunCases) {}

	async registerSpeedRun(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const { time } = req.body

		try {
			await this.speedRunUseCase.registerSpeedRun(username, time)
			return res.status(201).json({ message: 'Speedrun registered' })
		} catch (error) {
			next(error)
		}
	}

	async deleteSpeedRun(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const { id } = req.params

		try {
			await this.speedRunUseCase.deleteSpeedRun(username, id)
			return res.status(200).json({ message: 'Speedrun deleted' })
		} catch (error) {
			next(error)
		}
	}

	async findSpeedRunById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		try {
			const run = await this.speedRunUseCase.findSpeedRunById(id)
			return res.status(200).json(run)
		} catch (error) {
			next(error)
		}
	}

	async findAllRuns(req: Request, res: Response, next: NextFunction) {
		const skip = req.body

		try {
			const runs = await this.speedRunUseCase.findAllRuns(skip)
			return res.status(200).json(runs)
		} catch (error) {
			next(error)
		}
	}
}

export { SpeedRunController }
