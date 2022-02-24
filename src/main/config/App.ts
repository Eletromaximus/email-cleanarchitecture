import express from 'express'
import setupMiddleware from './SetupMiddleware'

const app = express()
setupMiddleware(app)

export default app
