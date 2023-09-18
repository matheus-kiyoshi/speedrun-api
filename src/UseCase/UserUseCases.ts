import User from "../entities/User"
import { HttpException } from "../interfaces/HttpException"
import { UserRepository } from "../repositories/UserRepository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserUseCases {
	constructor(private userRepository: UserRepository) {}

	async createUser(user: User) {
		if (!user.username || !user.email || !user.password) {
			throw new HttpException('Missing username, email or password', 400)
		}
		if (user.password.length < 6) {
			throw new HttpException('Password must be at least 6 characters', 400)
		}

		// verify if user already exists
    const userExists = await this.userRepository.findByUsername(user.username)
    if (userExists) {
      throw new HttpException('User already exists', 409)
    }

		const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

		const result = await this.userRepository.createUser(user)
    return result
	}
	
	async login(username: string, password: string) {
    if (!username) {
      throw new HttpException('Email is required', 400)
    }
    if (!password) {
      throw new HttpException('Password is required', 400)
    }

    const user = await this.userRepository.findByUsername(username)
    if (!user) {
      throw new HttpException('User not found', 404)
    }

    // verify password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new HttpException('Invalid password', 422)
    }

    try {
      const secret = process.env.SECRET || ''
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username
        },
        secret,
        {
          expiresIn: '8h'
        }
      )

      return { msg: 'Login successful', token: token }
    } catch (error) {
      throw new HttpException('Internal server error', 500)
    }
  }

	async updateUser(username: string, newUsername: string) {
		if (!username) {
			throw new HttpException('Username is required', 400)
		}
		if (!newUsername) {
			throw new HttpException('New username is required', 400)
		}

		const user = await this.userRepository.findByUsername(username)
		if (!user) {
			throw new HttpException('User not found', 404)
		}

		const result = await this.userRepository.updateUser(user._id, newUsername)
		return result
	}

	async deleteUser(username: string, password: string) {
		if (!username) {
			throw new HttpException('Username is required', 400)
		}
		if (!password) {
			throw new HttpException('Password is required', 400)
		}

		const user = await this.userRepository.findByUsername(username)
		if (!user) {
			throw new HttpException('User not found', 404)
		}

		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) {
			throw new HttpException('Invalid password', 422)
		}

		const result = await this.userRepository.deleteUser(user._id)
		return result
	}

	async updatePassword(username: string, password: string, newPassword: string) {
		if (!username) {
			throw new HttpException('Username is required', 400)
		}
		if (!password) {
			throw new HttpException('Password is required', 400)
		}
		if (!newPassword) {
			throw new HttpException('New password is required', 400)
		}
		
		const user = await this.userRepository.findByUsername(username)
		if (!user) {
			throw new HttpException('User not found', 404)
		}

		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) {
			throw new HttpException('Invalid password', 422)
		}

		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(newPassword, salt)

		const result = await this.userRepository.updatePassword(user._id, user.password)
		return result
	}

	async findUser(username: string) {
		if (!username) {
			throw new HttpException('Username is required', 400)
		}

		const user = await this.userRepository.findUser(username)
		return user
	}

	async registerSpeedRun(username: string, time: number) {
		if (!username) {
			throw new HttpException('Username is required', 400)
		}
		if (!time) {
			throw new HttpException('Time is required', 400)
		}

		if (isNaN(time)) {
			throw new HttpException('Time must be a number', 400)
		}
		const timer = Number(time)

		const user = await this.userRepository.findByUsername(username)
		if (!user) {
			throw new HttpException('User not found', 404)
		}

		const run = {
			user: user.username,
			time: timer
		}

		console.log(run)

		try {
			const result = await this.userRepository.registerSpeedRun(run)
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

		const speedRun = await this.userRepository.findSpeedRunById(id)
		if (!speedRun) {
			throw new HttpException('Speedrun not found', 404)
		}

		if (speedRun.user !== username) {
			throw new HttpException('Unauthorized', 401)
		}

		const result = await this.userRepository.deleteSpeedRun(id)
		return result
	}

	async findSpeedRunById(id: string) {
		if (!id) {
			throw new HttpException('Id is required', 400)
		}

		const result = await this.userRepository.findSpeedRunById(id)
		return result
	}

	async findAllRuns(skip: number) {
		if (!skip) {
			skip = 0
		}
		
		try {
			const result = await this.userRepository.findAllRuns(skip)
			return result
		} catch (error) {
			throw new HttpException('Internal server error', 500)
		}
	}
}

export { UserUseCases }