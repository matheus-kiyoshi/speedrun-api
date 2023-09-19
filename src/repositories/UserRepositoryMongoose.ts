import mongoose from 'mongoose'
import User from '../entities/User'
import { UserRepository, UserWithID } from './UserRepository'

const UserModel = mongoose.model('User', new mongoose.Schema({
	_id: {
    type: String,
    default: new mongoose.Types.ObjectId().toString()
  },
	username: String, 
	email: String,
	password: String
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

	async findByUsername(username: string): Promise<UserWithID | undefined> {
    const userModel = await UserModel.findOne({ username: username }).exec()

    return userModel ? userModel.toObject() : undefined
  }

	async findUser(username: string): Promise<UserWithID | undefined> {
		const userModel = await UserModel.findOne({ username: username }).select('-password -__v').exec()

		return userModel ? userModel.toObject() : undefined
	}
}

export { UserRepositoryMongoose }
