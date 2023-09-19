import User from '../entities/User'

export interface UserWithID extends User {
	_id: string
}

export interface UserMessage {
	username: string
	message: string
}

interface UserRepository {
	createUser(user: User): Promise<unknown>
	updateUser(id: string, newUsername: string): Promise<void>
	deleteUser(id: string): Promise<void>
	updatePassword(id: string, newPassword: string): Promise<void>
	sendMessage(id: string, message: string): Promise<void>
	findAllMessages(): Promise<UserMessage[]>
	findByUsername(username: string): Promise<UserWithID | undefined>
	findUser(username: string): Promise<UserWithID | undefined>
}

export { UserRepository }