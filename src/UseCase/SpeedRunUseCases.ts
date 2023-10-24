import { HttpException } from "../interfaces/HttpException"
import { SpeedRunRepository } from "../repositories/SpeedRunRepository"
import { UserRepository } from "../repositories/UserRepository"

class SpeedRunCases {
	constructor(
		private speedRunRepository: SpeedRunRepository,
		private userRepository: UserRepository	
	) {}

	async registerSpeedRun(username: string, time: number) {
		if (!username) {
			throw new HttpException('Username is required', 400)
		}
		if (!time) {
			throw new HttpException('Time is required', 400)
		}
		
		const timer = Number(time)
		if (isNaN(timer)) {
			throw new HttpException('Time must be a number', 400)
		}

		const run = {
			user: username,
			time: timer
		}

		try {
			const result = await this.speedRunRepository.registerSpeedRun(run)
			return result
		} catch (error) {
			throw new HttpException('Internal server error', 500)
		}
	}

	async deleteSpeedRun(username: string, id: string) {
		if (!username) {
			throw new HttpException('Username is required', 400)
		}
		if (!id) {
			throw new HttpException('Id is required', 400)
		}

		const user = await this.userRepository.findByUsername(username)
		if (!user) {
			throw new HttpException('User not found', 404)
		}

		const speedRun = await this.speedRunRepository.findSpeedRunById(id)
		if (!speedRun) {
			throw new HttpException('Speedrun not found', 404)
		}

		if (speedRun.user !== username) {
			throw new HttpException('Unauthorized', 401)
		}

		const result = await this.speedRunRepository.deleteSpeedRun(id)
		return result
	}

	async findSpeedRunById(id: string) {
		if (!id) {
			throw new HttpException('Id is required', 400)
		}

		const result = await this.speedRunRepository.findSpeedRunById(id)
		return result
	}

	async findAllRuns(skip: number) {
		if (!skip) {
			skip = 0
		}
		
		try {
			const result = await this.speedRunRepository.findAllRuns(skip)
			return result
		} catch (error) {
			throw new HttpException('Internal server error', 500)
		}
	}
}

export { SpeedRunCases }