import Run from '../entities/Run'

interface SpeedRunRepository {
	registerSpeedRun(run: Run): Promise<void>
	findAllRuns(skip: number): Promise<Run[]>
	deleteSpeedRun(id: string): Promise<void>
	findSpeedRunById(id: string): Promise<Run | undefined>
}

export { SpeedRunRepository }