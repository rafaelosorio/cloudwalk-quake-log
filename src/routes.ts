import express, { Request, Response } from 'express'
import { handleLog } from './utils'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const logContent = await handleLog()
    res.json(logContent)
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while processing the log: ${
        error instanceof Error ? error.message : error
      }`
    })
  }
})

export default router
