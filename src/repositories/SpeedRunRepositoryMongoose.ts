import mongoose from 'mongoose'
import Run from '../entities/Run'
import { SpeedRunRepository } from './SpeedRunRepository'

const RunModel = mongoose.model('Run', new mongoose.Schema({
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

class SpeedRunRepositoryMongoose implements SpeedRunRepository {
	async registerSpeedRun(run: Run): Promise<void> {
		const runModel = new RunModel(run)

		await runModel.save()

		return
	}

	async findAllRuns(skip: number): Promise<Run[]> {
		const runModel = await RunModel.find({}).select('user time').skip(skip).limit(10).exec()

		return runModel
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

export { SpeedRunRepositoryMongoose }
