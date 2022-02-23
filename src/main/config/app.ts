import express from 'express'
import setupMiddleware from './setupMiddleware'

const app = express()
setupMiddleware(app)

export default app
