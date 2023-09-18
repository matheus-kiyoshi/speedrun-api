import { NextFunction, Request, Response } from "express";
import { UserUseCases } from "../UseCase/UserUseCases";

class UserController {
	constructor(private userUseCase: UserUseCases) {}

	async createUser(req: Request, res: Response, next: NextFunction) {
		const { username, email, password } = req.body

    try {
      await this.userUseCase.createUser({
        username,
				email,
        password
      })
      return res.status(201).json({ message: 'User created' })
    } catch (error) {
      next(error)
    }
	}

	async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body
    
    try {
      const user = await this.userUseCase.login(username, password)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

	async findUser(req: Request, res: Response, next: NextFunction) {
		const { username } = req.params

		try {
			const user = await this.userUseCase.findUser(username)
			return res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	async updateUser(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const { newUsername } = req.body

		try {
			await this.userUseCase.updateUser(username, newUsername)
			return res.status(200).json({ message: 'User updated' })
		} catch (error) {
			next(error)
		}
	}

	async deleteUser(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const { password } = req.body

		try {
			await this.userUseCase.deleteUser(username, password)
			return res.status(200).json({ message: 'User deleted' })
		} catch (error) {
			next(error)
		}
	}

	async updatePassword(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const { password, newPassword } = req.body

		try {
			await this.userUseCase.updatePassword(username, password, newPassword)
			return res.status(200).json({ message: 'Password updated' })
		} catch (error) {
			next(error)
		}
	}

	async registerSpeedRun(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const time = req.body

		console.log(time)
		console.log(username)
		try {
			await this.userUseCase.registerSpeedRun(username, time)
			return res.status(201).json({ message: 'Speedrun registered' })
		} catch (error) {
			next(error)
		}
	}

	async deleteSpeedRun(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const { id } = req.params

		try {
			await this.userUseCase.deleteSpeedRun(username, id)
			return res.status(200).json({ message: 'Speedrun deleted' })
		} catch (error) {
			next(error)
		}
	}

	async findSpeedRunById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		try {
			const run = await this.userUseCase.findSpeedRunById(id)
			return res.status(200).json(run)
		} catch (error) {
			next(error)
		}
	}

	async findAllRuns(req: Request, res: Response, next: NextFunction) {
		const skip = req.body

		try {
			const runs = await this.userUseCase.findAllRuns(skip)
			return res.status(200).json(runs)
		} catch (error) {
			next(error)
		}
	}
}

export { UserController }
