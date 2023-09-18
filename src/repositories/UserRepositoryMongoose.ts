import mongoose from 'mongoose'
import User from '../entities/User'
import { UserRepository, UserWithID } from './UserRepository'
import Run from '../entities/Run'

const UserModel = mongoose.model('User', new mongoose.Schema({
	_id: {
    type: String,
    default: new mongoose.Types.ObjectId().toString()
  },
	username: String, 
	email: String,
	password: String
}))

const RunModel = mongoose.model('Run', new mongoose.Schema({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId().toString()
	},
	user: {
		type: String,
		ref: 'User',
		required: true
	},
	time: {
		type: Number,
		required: true
	}
}))

class UserRepositoryMongoose implements UserRepository {
	async createUser(user: User): Promise<unknown> {
		const userModel = new UserModel(user)

    await userModel.save()

    return userModel
	}

	async updateUser(id: string, newUsername: string): Promise<void> {
		const userModel = await UserModel.findByIdAndUpdate(
      id,
      { 
        $set: {
          username: newUsername 
        }
      },
      { new: true }
    ).select('-password -__v -_id')

    return userModel ? userModel.toObject() : undefined
	}

	async deleteUser(id: string): Promise<void> {
		const userModel = await UserModel.findByIdAndDelete(id)

		return
	}

	async updatePassword(id: string, newPassword: string): Promise<void> {
    const userModel = await UserModel.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true }
    )

    return
  }

	async registerSpeedRun(run: Run): Promise<void> {
		const runModel = new RunModel(run)

		await runModel.save()

		return
	}

	async findAllRuns(skip: number): Promise<Run[]> {
		const runModel = await RunModel.find({}).select('user time').skip(skip).limit(10).exec()

		return runModel
	}

	async findByUsername(username: string): Promise<UserWithID | undefined> {
    const userModel = await UserModel.findOne({ username: username }).exec()

    return userModel ? userModel.toObject() : undefined
  }

	async findUser(username: string): Promise<UserWithID | undefined> {
		const userModel = await UserModel.findOne({ username: username }).select('-password -__v').exec()

		return userModel ? userModel.toObject() : undefined
	}
	
	async findSpeedRunById(id: string): Promise<Run | undefined> {
		const runModel = await RunModel.findById(id).exec()

		return runModel ? runModel.toObject() : undefined
	}

	async deleteSpeedRun(id: string): Promise<void> {
		const runModel = await RunModel.findByIdAndDelete(id)

		return
	}
}

export { UserRepositoryMongoose }
