import Run from '../entities/Run'
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
	registerSpeedRun(run: Run): Promise<void>
	findAllRuns(skip: number): Promise<Run[]>
	deleteSpeedRun(id: string): Promise<void>
	findSpeedRunById(id: string): Promise<Run | undefined>
}

export { UserRepository }