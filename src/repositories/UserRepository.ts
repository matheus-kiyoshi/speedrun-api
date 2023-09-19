import User from '../entities/User'

export interface UserWithID extends User {
	_id: string
}

interface UserRepository {
	createUser(user: User): Promise<unknown>
	updateUser(id: string, newUsername: string): Promise<void>
	deleteUser(id: string): Promise<void>
	updatePassword(id: string, newPassword: string): Promise<void>
	findByUsername(username: string): Promise<UserWithID | undefined>
	findUser(username: string): Promise<UserWithID | undefined>
}

export { UserRepository }