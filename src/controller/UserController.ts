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

	async sendMessage(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const { message } = req.body

		try {
			await this.userUseCase.sendMessage(username, message)
			return res.status(200).json({ message: 'Message sent' })
		} catch (error) {
			next(error)
		}
	}

	async editMessage(req: Request, res: Response, next: NextFunction) {
		const { username } = req.user
		const { message } = req.body

		try {
			await this.userUseCase.sendMessage(username, message)
			return res.status(200).json({ message: 'Message updated' })
		} catch (error) {
			next(error)
		}
	}

	async findAllMessages(req: Request, res: Response, next: NextFunction) {
		try {
			const messages = await this.userUseCase.findAllMessages()
			return res.status(200).json(messages)
		} catch (error) {
			next(error)
		}
	}
}

export { UserController }
